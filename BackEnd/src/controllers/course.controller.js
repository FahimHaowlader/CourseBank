// utils
import apiError from '../utils/apiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import apiResponse from '../utils/apiResponse.js';
import mongoose from 'mongoose';
import { deleteLocalFiles , deleteLocalFile } from '../utils/delete.js';
import { uploadOnCloudinary , deleteCloudFileByUrl } from '../utils/cloudinary.js';
import { v4 as uuidv4 } from 'uuid';

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

  const result = await getCourses(userId, parameters, page, sort);

  if (!result) throw new apiError(500, "Error fetching courses");

  res.status(200).json( new apiResponse(200, result, "Courses fetched successfully"));
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

  res.status(200).json( new apiResponse(200, course, "Course details fetched successfully"));
});

// Controller(Moderators and admin)

const getCourseByCreatorId = asyncHandler(async (req, res) => {
  const requesterId = req.user?._id;
  const role = req.user?.role;
  const { userId: queryUserId } = req.query;

  // Auth check
  if (!requesterId) {
    throw new apiError(401, "Unauthorized");
  }

  let filter = {};

  if (role === "moderator") {
    // Moderators can only see their own courses
    filter.createdBy = requesterId;
  } else if (role === "admin") {
    // Admin sees courses of queryUserId if provided, otherwise their own courses
    filter.createdBy = queryUserId || requesterId;
  } else {
    throw new apiError(403, "Forbidden");
  }

  const courses = await Course.find(filter);

  res.status(200).json(
   new apiResponse(200, courses, "Courses fetched successfully")
  );
});

const createCourse = asyncHandler(async (req, res) => {
  const moderatorId = req.user._id;
  const courseData = req.body;

  const { title, courseCode, department, startingDate, instructorName, degree, semester, type, category } = courseData;

  if (!title || !courseCode || !department || !startingDate || !instructorName || !degree || !semester || !type || !category) {
    throw new apiError(400, "All required course fields must be provided");
  }

  try {
    const newCourse = new Course({
      ...courseData,
      createdBy: moderatorId
    });

    await newCourse.save();

    res.status(200).json( new apiResponse(200, {}, "Course created successfully"));
  } catch (err) {
      if (err.code === 11000 && err.keyValue.courseCode) {
          throw new apiError(400, `Course with code ${err.keyValue.courseCode} already exists`);
        }
        throw new apiError(500, "Error creating course");
    }
});

const updateCourseInfo = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const updateData = req.body;
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

  // Block restricted fields
  const restrictedFields = ["department", "semester", "degree"];
  for (const field of restrictedFields) {
    if (field in updateData) {
      throw new apiError(
        400,
        "Department, Semester, and Degree fields cannot be updated"
      );
    }
  }

  // Build query based on role
  const query = { _id: courseId };

  // Moderator can update only their own course
  if (role === "moderator") {
    query.createdBy = userId;
  }

  // Admin can update any course (no ownership restriction)
  if (role !== "admin" && role !== "moderator") {
    throw new apiError(403, "Forbidden");
  }

  const updatedCourse = await Course.findOneAndUpdate(
    query,
    { $set: updateData },
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
  
  const localImagePath = req.file?.path;
  if (!localImagePath) {
    throw new apiError(400, "Image file is required");
  }
  // upload to cloudinary
  const uploadResult = await uploadOnCloudinary(localImagePath);
  if (!uploadResult) {
    await deleteLocalFile(localImagePath);
    throw new apiError(500, "Image upload failed");
  }
  
  await deleteLocalFile(localImagePath);

  res.status(200).json(
    new apiResponse(200, { imageUrl: uploadResult.secure_url }, "Image uploaded successfully")
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

  const localFilePath = req.file?.path;
  if (!localFilePath) {
    throw new apiError(400, "File is required");
  }

  // upload in cloudinary

  const uploadResult = await uploadOnCloudinary(localFilePath);
  if (!uploadResult) {
    await deleteLocalFile(localFilePath);
    throw new apiError(500, "File upload failed");
  }

  await deleteLocalFile(localFilePath);

  res.status(200).json(
    new apiResponse(200, { fileUrl: uploadResult.secure_url }, "File uploaded successfully")
  );  
});

const deleteFile = asyncHandler(async (req, res) => {
  const { fileUrl } = req.body;
  const userId = req.user?._id;
  const role = req.user?.role;

  // Auth check
  if (!userId || !role) {
    throw new apiError(401, "Unauthorized: User ID or role missing");
  }

  if (!fileUrl) {
    throw new apiError(400, "File URL is required");
  }

  const deletionResult = await deleteCloudFileByUrl(fileUrl);
  if (!deletionResult) {
    throw new apiError(500, "File deletion failed");
  }

  res.status(200).json(
    new apiResponse(200, {}, "File deleted successfully")
  );  
});

const updateCourseMaterials = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { materials } = req.body;
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

  // Materials validation
  if (!Array.isArray(materials)) {
    throw new apiError(400, "Materials must be an array");
  }

  // Role-based query
  const query = { _id: courseId };

  // Moderator: ownership enforced
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
    { $set: { materials } },
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
        ? "Course materials updated successfully by admin"
        : "Course materials updated successfully by moderator"
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

  // Books validation
  if (!Array.isArray(books)) {
    throw new apiError(400, "Books must be an array");
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
    { $set: { books } },
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
        ? "Course suggested books updated successfully by admin"
        : "Course suggested books updated successfully by moderator"
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
    { $unset: { handbook: "" } },
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
      deletedCourse,
      role === "admin"
        ? "Course deleted successfully by admin"
        : "Course deleted successfully by moderator"
    )
  );
});



export { userCourseSearch, fullCourseDetails,getCourseByCreatorId, createCourse, updateCourseInfo, uploadImage, uploadFile, deleteFile, updateCourseMaterials, updateCourseTasks, updateCourseAssessments, updateSuggestedBooks, updateCourseHandbook, deleteCourseHandbook, deleteCourse };
