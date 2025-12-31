// utils
import apiError from '../utils/apiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import apiResponse from '../utils/apiResponse.js';
import mongoose from 'mongoose';
import { deleteLocalFiles , deleteLocalFile } from '../utils/delete.js';
import { uploadOnCloudinary , deleteCloudinaryFileById } from '../utils/cloudinary.js';
import { v4 as uuidv4, validate } from 'uuid';

// model
import Course from '../models/course.model.js';

// In-memory cache (shared across requests)
const userQueryCache = {};

// Helper function to get courses
async function getCourses(userId, parameters ={},page,sort ={}) {
  const query = {};

  // Build query
  for (const [key, value] of Object.entries(parameters)) {
    if (!value) continue;

    if (typeof value === "number" && key !== "year") {
      query[key] = value;
    } else if (key === "year") {
      const year = Number(value);
      query.startingDate = {
        $gte: new Date(year, 0, 1),
        $lte: new Date(year, 11, 31, 23, 59, 59),
      };
    } else if (
      ["department", "degree", "type", "category", "semester"].includes(key)
    ) {
      query[key] = value.toLowerCase();
    } else if (typeof value === "string") {
      const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      query[key] = { $regex: escaped, $options: "i" };
    }
  }

  // Pagination
  const currentPage = Number(page) || 1;
  const limit = 12;
  const skip = (currentPage - 1) * limit;

  // Sorting (does not affect cache)
  const sortField = sort?.sortField || "startingDate";
  const sortOrder = sort?.sortOrder === "desc" ? -1 : 1;

  // Only use query parameters for cache key
  const currentQueryKey = JSON.stringify(query);

  if (!userQueryCache[userId]) userQueryCache[userId] = {};

  let cached = userQueryCache[userId];
  let totalDocuments;
  let sendTotal = false;

  try {
    if (
      cached.lastQueryKey === currentQueryKey &&
      cached.timestamp &&
      Date.now() - cached.timestamp < 60 * 60 * 1000
    ) {
      // Use cached totalDocuments
      totalDocuments = cached.lastTotalDocuments;
      sendTotal = false;
    } else {
      // Count documents
      totalDocuments = await Course.countDocuments(query);
      sendTotal = true;

      // Save cache
      userQueryCache[userId] = {
        lastQueryKey: currentQueryKey,
        lastTotalDocuments: totalDocuments,
        timestamp: Date.now(),
      };

      // Auto-delete cache after 1 hour
      setTimeout(() => {
        if (
          userQueryCache[userId] &&
          userQueryCache[userId].lastQueryKey === currentQueryKey
        ) {
          delete userQueryCache[userId];
        }
      }, 60 * 60 * 1000);
    }
  } catch (err) {
    sendTotal = false;
    throw new apiError( 400, "Error counting documents");
  }

  // Fetch paginated courses with sorting
  const courses = await Course.find(query)
    .sort({ [sortField]: sortOrder })
    .skip(skip)
    .limit(limit)


  const response = {
    page: currentPage,
    courses,
  };

  if (sendTotal) response.totalDocuments = totalDocuments;

  return response;
}



// Controller(User)

// User dynamic seacrh with caching
const userCourseSearch = asyncHandler(async (req, res) => {
  const { parameters = {}, page = 1, sort = {} } = req.body;

  // Check cookie for userId
  let userId = req.cookies?.userId;
  if (!userId) {
    // Generate random ID for anonymous user
    userId = uuidv4();
  }

  // Refresh cookie on every request (1 hour from now)
  res.cookie("userId", userId, {
    maxAge: 60 * 60 * 1000, // 1 hour
    httpOnly: true,
    sameSite: "none",
    secure: process.env.NODE_ENV === "production",
  });

  const result = await getCourses(userId, parameters, page, sort );

  if (!result) throw new apiError(500, "Error fetching courses");

  res.status(200).json(new apiResponse(200, result, "Courses fetched successfully"));
});


// Get full course details
const fullCourseDetails = asyncHandler(async (req, res) => {
  const courseId = req.params?.courseId;
  
  if (!courseId) {
    throw new apiError(400, "Course ID is required");
  }

  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    throw new apiError(400, "Invalid Course ID");
  }

  const course = await Course.findById(courseId).select(
    '+description +instructorDepartment +instructorImage +books +materials +tasks +assesments +handbook'
  );

  if (!course) {
    throw new apiError(404, "Course not found");
  }

  res.status(200).json(new apiResponse(200, course, "Course details fetched successfully"));
});

// Controller(Moderators and admin)

const getCourseByCreatorId = asyncHandler(async (req, res) => {
  const requesterId = req.user?._id;
  const role = req.user?.role;
  const { userId: queryUserId } = req.params;

  // Auth check
  if (!requesterId) {
    throw new apiError(401, "Unauthorized");
  }

  let filter = {};
  // console.log("Role:", role);

  if (role === "moderator") {
    // Moderators can only see their own courses
    filter.createdBy = requesterId;
  } else if (role === "admin") {
    // Admin sees courses of queryUserId if provided, otherwise their own courses
    filter.createdBy = queryUserId || requesterId;
  } else {
    throw new apiError(403, "Forbidden");
  }
  // console.log("Filter:", filter);
  const courses = await Course.find(filter);

  res.status(200).json(
    new apiResponse(200, courses, "Courses fetched successfully")
  );
});

const createCourse = asyncHandler(async (req, res) => {
  const Id = req.user._id;
  const {courseData} = req.body;
  console.log("Course Data:", courseData);

  if (!Id) {
    throw new apiError(401, "Unauthorized");
  }

  // Validate required fields
  if(!courseData){
    throw new apiError(400, "Course data is required");
  }
 
 const { title, courseCode, department, staringDate, instructorName, degree, semester, type, category } = courseData;
  if (!title || !courseCode || !department || !staringDate || !instructorName || !degree || !semester || !type || !category) {
    throw new apiError(400, "All required course fields must be provided");
  }

  try {
    const newCourse = new Course({
      ...courseData,
      createdBy: Id
    });

    await newCourse.save();

    res.status(200).json(new apiResponse(200, {}, "Course created successfully"));
  } catch (err) {
      if (err.code === 11000 && err.keyValue.courseCode) {
          throw new apiError(400, `Course with code ${err.keyValue.courseCode} already exists`);
        }
        throw new apiError(500, "Error creating course");
    }
});

const updateCourseInfo = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const {updatedData} = req.body;
  const userId = req.user?._id;
  const role = req.user?.role;

  // Auth check
  if (!userId) {
    throw new apiError(401, "Unauthorized");
  }

  // Course ID validation
  if (!courseId) {
    throw new apiError(400, "Course ID is required");
  }

  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    throw new apiError(400, "Invalid Course ID");
  }

  if(!updatedData){
    throw new apiError(400, "Update data is required");
  }
  // Block restricted fields
  const restrictedFields = ["department", "semester", "degree"];
  for (const field of restrictedFields) {
    if (field in updatedData) {
      throw new apiError(
        400,
        "Department, Semester, and Degree fields cannot be updated"
      );
    }
  }

  // Build query based on role
  const query = { _id: courseId };

  // Moderator can update only their own course
  if (role === "moderator" ) {
    query.createdBy = userId;
  }

  // Admin can update any course (no ownership restriction)
  if (role !== "admin" && role !== "moderator") {
    throw new apiError(403, "Forbidden");
  }

  const updatedCourse = await Course.findOneAndUpdate(
    query,
    { $set: updatedData },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedCourse) {
    throw new apiError(
      403,
      "Course not found or you are not authorized to update it"
    );
  }

  res.status(200).json(
    new apiResponse(
      200,
      updatedCourse,
      role === "admin"
        ? "Course updated successfully by admin"
        : "Course updated successfully by moderator"
    )
  );
});


const uploadImage = asyncHandler(async (req, res) => {
  const userId = req.user?._id; // do not need to check those 
  const role = req.user?.role;
  
  // Auth check
  if (!userId || !role) {
    throw new apiError(401, "Unauthorized: User ID or role missing");
  }
  

  const file = req.file;
  if(!file){
    throw new apiError(400, "Image file is required");
  }

  // Checks if the mimetype starts with "image/" (e.g., image/jpeg, image/png)
if (!file.mimetype.startsWith("image/")) {
  await deleteLocalFile(req.file.path);
  throw new apiError(400, "Only image files are allowed");
}

  const localImagePath = req.file?.path;

 
  if (!localImagePath) {
      await deleteLocalFile(req.file.path);
    throw new apiError(400, "Image file is required");
  }
  // upload to cloudinary
  const uploadResult = await uploadOnCloudinary(localImagePath);
  
  if (!uploadResult) {
    throw new apiError(500, "Image upload failed");
  }
  
  res.status(200).json(
    new apiResponse(200, { imageUrl: uploadResult.secure_url ,publicId : uploadResult.public_id}, "Image uploaded successfully")
  );  

  // ONE DB CALL (ownership + update)
 
});

const uploadFile = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const role = req.user?.role;


  // Auth check
  if (!userId || !role) {
    throw new apiError(401, "Unauthorized: User ID or role missing");
  }
  
  const file = req.file;
  if(!file){
    throw new apiError(400, "File is required");
  }

  if (file.mimetype !== "application/pdf") {
    await deleteLocalFile(req.file.path);
    throw new apiError(400, "Only PDF files are allowed");
  }
  const localFilePath = req.file?.path;

  if (!localFilePath) {
    await deleteLocalFile(req.file.path);
    throw new apiError(400, "File is required");
  }

  // upload in cloudinary

  const uploadResult = await uploadOnCloudinary(localFilePath);

  if (!uploadResult) {
    throw new apiError(500, "File upload failed");
  }


  res.status(200).json(
    new apiResponse(200, { fileUrl: uploadResult.secure_url,publicId:uploadResult.public_id }, "File uploaded successfully")
  );  
});

const deleteFile = asyncHandler(async (req, res) => {
  const { publicId } = req.body;
  const userId = req.user?._id;
  const role = req.user?.role;

  console.log("Delete fileUrl:", publicId);
  // Auth check
  if (!userId || !role) {
    throw new apiError(401, "Unauthorized: User ID or role missing");
  }

  if (!publicId) {
    throw new apiError(400, "File public ID is required");
  }

  const deletionResult = await deleteCloudinaryFileById(publicId);
  if (!deletionResult) {
    throw new apiError(500, "File deletion failed");
  }

  res.status(200).json(
    new apiResponse(200, {}, "File deleted successfully")
  );  
});

const updateCourseMaterials = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { materials } = req.body; // Expecting [{name, fileUrl, publicId}]
  const userId = req.user?._id;
  const role = req.user?.role;

  if (!userId) throw new apiError(401, "Unauthorized");
  if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
    throw new apiError(400, "Valid Course ID is required");
  }

  if (!Array.isArray(materials)) {
    throw new apiError(400, "Materials must be an array");
  }

  // Define authorization query
  const query = { _id: courseId };
  if (role === "moderator") {
    query.createdBy = userId;
  } else if (role !== "admin") {
    throw new apiError(403, "Forbidden: Only admins and moderators can update materials");
  }

  // ONE DB CALL - Fixed Options and Select
  const updatedCourse = await Course.findOneAndUpdate(
    query,
    { $set: { materials } },
    {
      new: true,
      runValidators: true,
      // Select is passed inside the options object
      select: '+materials +materials.publicId' 
    }
  );

  if (!updatedCourse) {
    throw new apiError(
      404, // Use 404 if not found, or 403 if it's strictly an auth issue
      "Course not found or you lack the necessary permissions"
    );
  }

  res.status(200).json(
    new apiResponse(
      200,
      {updatedMaterials : updatedCourse.materials},
      `Course materials updated successfully by ${role}`
    )
  );
});

const updateCourseTasks = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { tasks } = req.body;
  const userId = req.user?._id;
  const role = req.user?.role;

  // Auth check
  if (!userId) {
    throw new apiError(401, "Unauthorized");
  }

  // Course ID validation
  if (!courseId) {
    throw new apiError(400, "Course ID is required");
  }

  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    throw new apiError(400, "Invalid Course ID");
  }

  // Tasks validation
  if (!Array.isArray(tasks)) {
    throw new apiError(400, "Tasks must be an array");
  }

  // Role-based query
  const query = { _id: courseId };

  // Moderator → only own courses
  if (role === "moderator") {
    query.createdBy = userId;
  }

  // Only admin or moderator allowed
  if (role !== "admin" && role !== "moderator") {
    throw new apiError(403, "Forbidden");
  }

  // ONE DB CALL
  const updatedCourse = await Course.findOneAndUpdate(
    query,
    { $set: { tasks } },
    {
      new: true,
      runValidators: true,
      select: '+tasks +tasks.publicId'
    }
  );

  if (!updatedCourse) {
    throw new apiError(
      403,
      "Course not found or you are not authorized to update it"
    );
  }

  res.status(200).json(
    new apiResponse(
      200,
      {updatedCourseTasks : updatedCourse.tasks},
      role === "admin"
        ? "Course tasks updated successfully by admin"
        : "Course tasks updated successfully by moderator"
    )
  );
});

const updateCourseAssessments = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { assessments } = req.body;
  const userId = req.user?._id;
  const role = req.user?.role;

  // Auth check
  if (!userId) {
    throw new apiError(401, "Unauthorized");
  }

  // Course ID validation
  if (!courseId) {
    throw new apiError(400, "Course ID is required");
  }

  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    throw new apiError(400, "Invalid Course ID");
  }

  // Assessments validation
  if (!Array.isArray(assessments)) {
    throw new apiError(400, "Assessments must be an array");
  }

  // Role-based query
  const query = { _id: courseId };

  // Moderator → only own courses
  if (role === "moderator") {
    query.createdBy = userId;
  }

  // Only admin or moderator allowed
  if (role !== "admin" && role !== "moderator") {
    throw new apiError(403, "Forbidden");
  }

  // ONE DB CALL
  const updatedCourse = await Course.findOneAndUpdate(
    query,
    { $set: { assessments } },
    {
      new: true,
      runValidators: true,
      select: '+assessments +assessments.publicId'
    }
  );

  if (!updatedCourse) {
    throw new apiError(
      403,
      "Course not found or you are not authorized to update it"
    );
  }
  // console.log("Updated Assessments:", updatedCourse.assessments);
  res.status(200).json(
    new apiResponse(
      200,
      {updatedCourseAssessments : updatedCourse.assessments},
      role === "admin"
        ? "Course assessments updated successfully by admin"
        : "Course assessments updated successfully by moderator"
    )
  );
});


const updateSuggestedBooks = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { books } = req.body;
  const userId = req.user?._id;
  const role = req.user?.role;

  if (!userId) throw new apiError(401, "Unauthorized");
  if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
    throw new apiError(400, "Invalid Course ID");
  }

  if (!Array.isArray(books)) {
    throw new apiError(400, "Books must be an array");
  }

  const query = { _id: courseId };
  if (role === "moderator") {
    query.createdBy = userId;
  } else if (role !== "admin") {
    throw new apiError(403, "Forbidden");
  }

  const updatedCourse = await Course.findOneAndUpdate(
    query,
    { $set: { books } }, // Overwrites existing books with the new list
    {
      new: true,
      runValidators: true,
      select: '+books' // publicId is usually select: false in schema, adding it here if needed
    }
  );

  if (!updatedCourse) {
    throw new apiError(404, "Course not found or unauthorized");
  }

  res.status(200).json(
    new apiResponse(
      200,
      { updatedSuggestedBooks: updatedCourse.books }, // Fixed syntax here
      `Course suggested books updated successfully by ${role}`
    )
  );
});


const updateCourseHandbook = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { handbook } = req.body;
  const userId = req.user?._id;
  const role = req.user?.role;

  // Auth check
  if (!userId) {
    throw new apiError(401, "Unauthorized");
  }

  // Course ID validation
  if (!courseId) {
    throw new apiError(400, "Course ID is required");
  }

  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    throw new apiError(400, "Invalid Course ID");
  }

  // Handbook validation
  if (!handbook) {
    throw new apiError(400, "Handbook URL is required");
  }

  // Role-based query
  const query = { _id: courseId };

  // Moderator → only own courses
  if (role === "moderator") {
    query.createdBy = userId;
  }

  // Only admin or moderator allowed
  if (role !== "admin" && role !== "moderator") {
    throw new apiError(403, "Forbidden");
  }

  // ONE DB CALL
  const updatedCourse = await Course.findOneAndUpdate(
    query,
    { $set: { handbook } },
    {
      new: true,
      runValidators: true,
      select: '+handbook +handbook.publicId'
    }
  );

  if (!updatedCourse) {
    throw new apiError(
      403,
      "Course not found or you are not authorized to update it"
    );
  }

  res.status(200).json(
    new apiResponse(
      200,
      {updatedCourseHandbook : updatedCourse.handbook},
      role === "admin"
        ? "Course handbook updated successfully by admin"
        : "Course handbook updated successfully by moderator"
    )
  );
});


const deleteCourseHandbook = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user?._id;
  const role = req.user?.role;

  // Auth check
  if (!userId) {
    throw new apiError(401, "Unauthorized");
  }

  // Course ID validation
  if (!courseId) {
    throw new apiError(400, "Course ID is required");
  }

  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    throw new apiError(400, "Invalid Course ID");
  }

  // Role-based query
  const query = { _id: courseId };

  // Moderator → only own courses
  if (role === "moderator") {
    query.createdBy = userId;
  }

  // Only admin or moderator allowed
  if (role !== "admin" && role !== "moderator") {
    throw new apiError(403, "Forbidden");
  }

  // ONE DB CALL
 const updatedCourse = await Course.findOneAndUpdate(
  query,
  { $unset: { handbook: "" } }, // Removes the entire handbook field
  { new: true },
  {runValidators: true,}
);

  if (!updatedCourse) {
    throw new apiError(
      403,
      "Course not found or you are not authorized to update it"
    );
  }

  res.status(200).json(
    new apiResponse(
      200,
      {},
      role === "admin"
        ? "Course handbook deleted successfully by admin"
        : "Course handbook deleted successfully by moderator"
    )
  );
});

const deleteCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user?._id;
  const role = req.user?.role;

  // Auth check
  if (!userId) {
    throw new apiError(401, "Unauthorized");
  }

  // Course ID validation
  if (!courseId) {
    throw new apiError(400, "Course ID is required");
  }

  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    throw new apiError(400, "Invalid Course ID");
  }

  // Role-based query
  const query = { _id: courseId };

  // Moderator → only own courses
  if (role === "moderator") {
    query.createdBy = userId;
  }

  // Only admin or moderator allowed
  if (role !== "admin" && role !== "moderator") {
    throw new apiError(403, "Forbidden");
  }

  // ONE DB CALL
  const deletedCourse = await Course.findOneAndDelete(query);

  if (!deletedCourse) {
    throw new apiError(
      403,
      "Course not found or you are not authorized to delete it"
    );
  }

  res.status(200).json(
    new apiResponse(
      200,
      {},
      role === "admin"
        ? "Course deleted successfully by admin"
        : "Course deleted successfully by moderator"
    )
  );
});



export { userCourseSearch, fullCourseDetails,getCourseByCreatorId, createCourse, updateCourseInfo, uploadImage, uploadFile, deleteFile, updateCourseMaterials, updateCourseTasks, updateCourseAssessments, updateSuggestedBooks, updateCourseHandbook, deleteCourseHandbook, deleteCourse };
