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
import User from '../models/user.model.js';

// In-memory cache (shared across requests)
const userQueryCache = {};

// Helper function to get courses
async function getCourses(userId, parameters ={},page,sort ={}) {
  const query = {status: "approved"}; // Only approved courses are visible to users

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
      ["department", "degree", "type", "format", "semester"].includes(key)
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
    '+description +instructorDepartment +instructorImage +books +materials +tasks +assessments +handbook'
  );

  if (!course) {
    throw new apiError(404, "Course not found");
  }

  res.status(200).json( new apiResponse(200, course, "Course details fetched successfully"));
});

// get full details for edit the course 

const fullCourseDetailsForEdit = asyncHandler(async (req, res, next) => {
  const { courseId } = req.params;
  const userId = req.user?._id;
  const userRole = req.user?.role;
  const hasAccess = req.user?.access === true;

  // 1. Initial Validations
  if (!userId) throw new apiError(401, "Unauthorized");
  if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
    throw new apiError(400, "Invalid Course ID");
  }

  // 2. Fetch course with required hidden fields (Added status and createdAt)
  const course = await Course.findById(courseId).select(
    '+description +instructorDepartment +instructorImage +createdBy +books +materials +tasks +assessments +handbook +status +createdAt'
  );

  if (!course) {
    throw new apiError(404, "Course not found");
  }

  // 3. Define Logic Flags
  const isOwner = course.createdBy.toString() === userId.toString();
  const isAdmin = userRole === 'admin';
  
  // Calculate if the course is older than 1 year
  const oneYearInMs = 365 * 24 * 60 * 60 * 1000;
  const isExpired = Date.now() - new Date(course.createdAt).getTime() > oneYearInMs;

  // console.log("User Role:", isExpired);

  // --- PERMISSION & LOCK LOGIC ---

  // Rule 1: Identity & General Access
  if (!isAdmin && !(isOwner && hasAccess)) {
    throw new apiError(403, "You do not have permission to edit this course or your access is disabled.");
  }

  // Rule 2: Time Lock (1 Year) - Only blocks non-admins
  if (!isAdmin && isExpired) {
    throw new apiError(403, "Course Locked: This record is over 1 year old and can only be modified by an Admin.");
  }

  // console.log("Course Status:", course.status);

  // Rule 3: Status Lock (Pending/Approved) - Only blocks non-admins
  // If status is NOT 'draft', contributors/moderators cannot edit
  if (!isAdmin && course.status === "approved") {
    throw new apiError(403, `Course Locked: This course is currently '${course.status}' and cannot be edited.`);
  }

  // 4. Final Response
  res.status(200).json(
    new apiResponse(200, course, "Course details fetched successfully for editing")
  );
});


// Controller(Moderators and admin)

const getCourseByCreatorId = asyncHandler(async (req, res,next) => {
  const requesterId = req.user?._id;
  const role = req.user?.role;
  const { userId: queryUserId } = req.params;
  const submittedAccount = req.user?.status === "approved";

  // Auth check
  if (!requesterId) {
    throw new apiError(401, "Unauthorized");
  }

  if (submittedAccount) {
    throw new apiError(403, "Your account has been approved.");
  }

  let filter = {};
  // console.log("Role:", role);

  if (role === "contributor") {
    // Moderators can only see their own courses
    filter.createdBy = requesterId;
  } else if (role === "admin" || role === "moderator") {
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

// --- CREATE COURSE ---
const createCourse = asyncHandler(async (req, res,next) => {
  const userId = req.user?._id;
  const userRole = req.user?.role;
  const hasAccess = req.user?.access === true;
  const data = req.body;

  if (!userId) throw new apiError(401, "Unauthorized");

  // 1. Access Check: Non-admins must have access: true
  if (userRole !== "admin" && !hasAccess) {
    throw new apiError(403, "Your account access is restricted. You cannot create courses.");
  }

  if (!data || Object.keys(data).length === 0) {
    throw new apiError(400, "Course data is required");
  }

  const { title, courseCode, startingDate, instructorName, type, format, department, semester, degree } = data;

  // 2. Duplicate Check (Owner-based)
  if (userRole !== "admin" && userRole !== "moderator") {
    const duplicate = await Course.findOne({ 
      courseCode: courseCode.trim(), 
      createdBy: userId 
    });
    if (duplicate) throw new apiError(409, `You already created course ${courseCode}`);
  }

  // 3. Validation
  if (!title || !courseCode || !startingDate || !instructorName || !type || !format || !department || !semester || !degree) {
    throw new apiError(400, "All required course fields must be provided");
  }

  const year = new Date(startingDate).getFullYear();

  try {
    const newCourse = new Course({ ...data, year, createdBy: userId });
    const savedCourse = await newCourse.save();

    // 4. Update User Profile Stats
    await User.findByIdAndUpdate(userId, {
      $push: { myCourses: savedCourse._id },
      $inc: { myCourseCount: 1 }
    });

    res.status(201).json(new apiResponse(201, savedCourse, "Course created successfully"));
    
  } catch (err) {
    if (err.code === 11000) throw new apiError(400, "Course code already exists");
    throw new apiError(500, err.message || "Error creating course");

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
    new apiResponse(200, { fileUrl: uploadResult.secure_url }, "File uploaded successfully")
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

const addNewMaterial = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { material } = req.body; // { name, fileUrl, publicId }
  const userId = req.user?._id;
  const role = req.user?.role;
  
  // Check if user has the 'access' flag set to true in their profile/token
  const hasAccess = req.user?.access === true;

  // 1. Strict Authorization Check
  // If the user is NOT an admin AND does NOT have the access flag, block them immediately.
  if (role !== "admin" && !hasAccess) {
    throw new apiError(403, "Forbidden: You do not have the required access to add materials.");
  }

  // 2. Data Validation
  if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
    throw new apiError(400, "Valid Course ID is required");
  }

  if (!material || typeof material !== 'object') {
    throw new apiError(400, "A valid material object is required");
  }

  if ( !material.name || !material.fileUrl || !material.id) {
    throw new apiError(400, "Material name and file URL and id are required");
  }

  // 3. Database Query
  // Even with 'hasAccess', we still verify they are the creator and it's a draft
  const query = { _id: courseId };
  
  if (role !== "admin") {
    query.createdBy = userId;
    query.status = "draft";
  }

  // 4. Atomic Push Operation
  const updatedCourse = await Course.findOneAndUpdate(
    query,
    { 
      $push: { materials: material } 
    },
    {
      new: true,
      runValidators: true,
      select: 'materials status' 
    }
  );

  if (!updatedCourse) {
    throw new apiError(
      404, 
      "Course not found, or you are not the creator, or it's no longer a draft."
    );
  }

  const newlyAdded = updatedCourse.materials[updatedCourse.materials.length - 1];

  res.status(200).json(
    new apiResponse(
      200,
      { 
        newMaterial: newlyAdded,
        totalMaterials: updatedCourse.materials.length 
      },
      "Material added successfully"
    )
  );
});

const deleteMaterial = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { materialId } = req.body; // Expecting { "materialId": "..." }
  const userId = req.user?._id;
  const role = req.user?.role;
  
  // Check access flag from the authenticated user
  const hasAccess = req.user?.access === true;

  // 1. Strict Authorization Check
  if (role !== "admin" && !hasAccess) {
    throw new apiError(403, "Forbidden: You do not have the required access to delete materials.");
  }

  // 2. Data Validation
  if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
    throw new apiError(400, "Valid Course ID is required");
  }

  if (!materialId || !mongoose.Types.ObjectId.isValid(materialId)) {
    throw new apiError(400, "A valid Material ID is required in the request body");
  }

  // 3. Database Query
  // Admin: Can delete from any course.
  // Others: Must be the creator AND the course must be in 'draft' status.
  const query = { _id: courseId };
  
  if (role !== "admin") {
    query.createdBy = userId;
    query.status = "draft";
  }

  // 4. Atomic Pull Operation
  // This looks inside the 'materials' array and removes the object where _id matches materialId
  const updatedCourse = await Course.findOneAndUpdate(
    query,
    { 
      $pull: { materials: { _id: materialId } } 
    },
    {
      new: true,
      select: 'materials status' 
    }
  );

  // 5. Handle Failure (Course not found, not a draft, or not the owner)
  if (!updatedCourse) {
    throw new apiError(
      404, 
      "Delete failed: Course not found, unauthorized, or it's no longer a draft."
    );
  }

  res.status(200).json(
    new apiResponse(
      200,
      { 
        totalMaterials: updatedCourse.materials.length 
      },
      "Material deleted successfully from the course."
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

const addNewTask = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { task } = req.body; // Expecting a single object: { title, description, deadline, etc. }
  const userId = req.user?._id;
  const role = req.user?.role;
  
  // Check for the 'access' requirement
  const hasAccess = req.user?.access === true;

  // 1. Strict Authorization Check
  if (role !== "admin" && !hasAccess) {
    throw new apiError(403, "Forbidden: You do not have the required access to add tasks.");
  }

  // 2. Data Validation
  if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
    throw new apiError(400, "Valid Course ID is required");
  }

  if (!task || typeof task !== 'object' ) {
    throw new apiError(400, "A valid task object is required");
  }

  // Ensure minimum task data exists (adjust fields based on your schema)
  if (!task.title || !task.fileUrl || !task.id) {
    throw new apiError(400, "Task title, file URL, and ID are required");
  }

  // 3. Database Query Logic
  // Admin: Can add to any course
  // Others: Must be the creator AND the course must be in 'draft' status
  const query = { _id: courseId };
  
  if (role !== "admin") {
    query.createdBy = userId;
    query.status = "draft";
  }

  // 4. Atomic Push Operation
  const updatedCourse = await Course.findOneAndUpdate(
    query,
    { 
      $push: { tasks: task } // Appends the new task object to the existing array
    },
    {
      new: true,
      runValidators: true,
      select: 'tasks status' 
    }
  );

  // 5. Handle Failure
  if (!updatedCourse) {
    throw new apiError(
      404, 
      "Action failed: Course not found, you aren't the owner, or it's no longer a draft."
    );
  }

  // Get the newly added task (the last one in the array)
  const newlyAddedTask = updatedCourse.tasks[updatedCourse.tasks.length - 1];

  res.status(200).json(
    new apiResponse(
      200,
      { 
        newTask: newlyAddedTask,
        totalTasks: updatedCourse.tasks.length 
      },
      "New task added successfully"
    )
  );
});

const deleteTask = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { taskId } = req.body; // Expecting { "taskId": "..." }
  const userId = req.user?._id;
  const role = req.user?.role;
  
  // Check access flag from the authenticated user
  const hasAccess = req.user?.access === true;

  // 1. Strict Authorization Check
  if (role !== "admin" && !hasAccess) {
    throw new apiError(403, "Forbidden: You do not have the required access to delete tasks.");
  }

  // 2. Data Validation
  if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
    throw new apiError(400, "Valid Course ID is required");
  }

  if (!taskId || !mongoose.Types.ObjectId.isValid(taskId)) {
    throw new apiError(400, "A valid Task ID is required in the request body");
  }

  // 3. Database Query
  // Admin: Can delete from any course.
  // Others: Must be the creator AND the course must be in 'draft' status.
  const query = { _id: courseId };
  
  if (role !== "admin") {
    query.createdBy = userId;
    query.status = "draft";
  }

  // 4. Atomic Pull Operation
  // This searches the 'tasks' array and removes the object where _id matches taskId
  const updatedCourse = await Course.findOneAndUpdate(
    query,
    { 
      $pull: { tasks: { _id: taskId } } 
    },
    {
      new: true,
      select: 'tasks status' 
    }
  );

  // 5. Handle Failure (Course not found, not a draft, or not the owner)
  if (!updatedCourse) {
    throw new apiError(
      404, 
      "Delete failed: Course not found, unauthorized, or it's no longer a draft."
    );
  }

  res.status(200).json(
    new apiResponse(
      200,
      { 
        totalTasks: updatedCourse.tasks.length 
      },
      "Task deleted successfully from the course."
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

const addNewAssessment = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { assessment } = req.body; // Expecting: { title, date, type, etc. }
  const userId = req.user?._id;
  const role = req.user?.role;
  const hasAccess = req.user?.access === true;

  // 1. Authorization Check
  if (role !== "admin" && !hasAccess) {
    throw new apiError(403, "Forbidden: You do not have the required access to add assessments.");
  }

  // 2. Initial Validations
  if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
    throw new apiError(400, "Valid Course ID is required");
  }

  if (!assessment || typeof assessment !== 'object') {
    throw new apiError(400, "A valid assessment object is required");
  }

  if( !assessment.title || !assessment.date || !assessment.type || !assessment.id) {
    throw new apiError(400, "Assessment title, date, type, and ID are required");
  }

  // 3. Date Validation Logic
  const course = await Course.findById(courseId).select('startingDate createdBy status');
  
  if (!course) {
    throw new apiError(404, "Course not found");
  }

  // Check if assessment date is before the course starting date
  if (new Date(assessment.date) < new Date(course.startingDate)) {
    throw new apiError(
      400, 
      `Assessment date cannot be earlier than the course starting date (${course.startingDate.toDateString()})`
    );
  }

  // 4. Build Query for Update
  const query = { _id: courseId };
  if (role !== "admin") {
    query.createdBy = userId;
    query.status = "draft";
  }

  // 5. Atomic Push Operation
  const updatedCourse = await Course.findOneAndUpdate(
    query,
    { 
      $push: { assessments: assessment } 
    },
    {
      new: true,
      runValidators: true,
      select: 'assessments status' 
    }
  );

  if (!updatedCourse) {
    throw new apiError(
      403, 
      "Action failed: You aren't the owner or the course is no longer a draft."
    );
  }

  const newlyAdded = updatedCourse.assessments[updatedCourse.assessments.length - 1];

  res.status(200).json(
    new apiResponse(
      200,
      { 
        newAssessment: newlyAdded,
        totalAssessments: updatedCourse.assessments.length 
      },
      "Assessment added successfully"
    )
  );
});


const deleteAssessment = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { assessmentId } = req.body; // Expecting { "assessmentId": "..." }
  const userId = req.user?._id;
  const role = req.user?.role;
  
  // Check access flag
  const hasAccess = req.user?.access === true;

  // 1. Strict Authorization Check
  if (role !== "admin" && !hasAccess) {
    throw new apiError(403, "Forbidden: You do not have the required access to delete assessments.");
  }

  // 2. Data Validation
  if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
    throw new apiError(400, "Valid Course ID is required");
  }

  if (!assessmentId || !mongoose.Types.ObjectId.isValid(assessmentId)) {
    throw new apiError(400, "A valid Assessment ID is required in the request body");
  }

  // 3. Database Query
  // Admin: Can delete from any course.
  // Others: Must be the creator AND the course must be in 'draft' status.
  const query = { _id: courseId };
  
  if (role !== "admin") {
    query.createdBy = userId;
    query.status = "draft";
  }

  // 4. Atomic Pull Operation
  // This removes the object from the assessments array where _id matches assessmentId
  const updatedCourse = await Course.findOneAndUpdate(
    query,
    { 
      $pull: { assessments: { _id: assessmentId } } 
    },
    {
      new: true,
      select: 'assessments status' 
    }
  );

  // 5. Handle Failure (Course not found, not a draft, or not the owner)
  if (!updatedCourse) {
    throw new apiError(
      404, 
      "Delete failed: Course not found, unauthorized, or it's no longer a draft."
    );
  }

  res.status(200).json(
    new apiResponse(
      200,
      { 
        totalAssessments: updatedCourse.assessments.length 
      },
      "Assessment deleted successfully."
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

const addNewSuggestedBook = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { book } = req.body; // Expecting: { title, author, link, publicId }
  const userId = req.user?._id;
  const role = req.user?.role;
  const hasAccess = req.user?.access === true;

  // 1. Strict Authorization Check
  if (role !== "admin" && !hasAccess) {
    throw new apiError(403, "Forbidden: You do not have the required access to add suggested books.");
  }

  // 2. Data Validation
  if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
    throw new apiError(400, "Valid Course ID is required");
  }

  if (!book || typeof book !== 'object' || Array.isArray(book)) {
    throw new apiError(400, "A valid book object is required");
  }

  if (!book.title || !book.authorName || !book.fileUrl || !book.id) {
    throw new apiError(400, "Book title, authorName, file URL, and ID are required");
  }

  // 3. Database Query
  // Admin: Can add to any course.
  // Others: Must be the creator AND the course must be in 'draft' status.
  const query = { _id: courseId };
  
  if (role !== "admin") {
    query.createdBy = userId;
    query.status = "draft";
  }

  // 4. Atomic Push Operation
  const updatedCourse = await Course.findOneAndUpdate(
    query,
    { 
      $push: { books: book } // Appends the book object to the existing array
    },
    {
      new: true,
      runValidators: true,
      select: 'books status' 
    }
  );

  // 5. Handle Failure
  if (!updatedCourse) {
    throw new apiError(
      404, 
      "Action failed: Course not found, you aren't the owner, or it's no longer a draft."
    );
  }

  // Get the newly added book (last item in the array)
  const newlyAddedBook = updatedCourse.books[updatedCourse.books.length - 1];

  res.status(200).json(
    new apiResponse(
      200,
      { 
        newBook: newlyAddedBook,
        totalBooksCount: updatedCourse.books.length 
      },
      "Suggested book added successfully"
    )
  );
});

const deleteSuggestedBook = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { bookId } = req.body; // Expecting { "bookId": "..." }
  const userId = req.user?._id;
  const role = req.user?.role;
  
  // Check for the 'access' flag in the authenticated user
  const hasAccess = req.user?.access === true;

  // 1. Strict Authorization Check
  if (role !== "admin" && !hasAccess) {
    throw new apiError(403, "Forbidden: You do not have the required access to delete suggested books.");
  }

  // 2. Data Validation
  if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
    throw new apiError(400, "Valid Course ID is required");
  }

  if (!bookId || !mongoose.Types.ObjectId.isValid(bookId)) {
    throw new apiError(400, "A valid Book ID is required in the request body");
  }

  // 3. Database Query
  // Admin: Full access to delete from any course.
  // Others: Must be the creator AND the course must be in 'draft' status.
  const query = { _id: courseId };
  
  if (role !== "admin") {
    query.createdBy = userId;
    query.status = "draft";
  }

  // 4. Atomic Pull Operation
  // This searches the 'books' array and removes the sub-document where _id matches bookId
  const updatedCourse = await Course.findOneAndUpdate(
    query,
    { 
      $pull: { books: { _id: bookId } } 
    },
    {
      new: true,
      select: 'books status' 
    }
  );

  // 5. Handle Failure
  if (!updatedCourse) {
    throw new apiError(
      404, 
      "Delete failed: Course not found, unauthorized, or it's no longer a draft."
    );
  }

  res.status(200).json(
    new apiResponse(
      200,
      { 
        totalBooks: updatedCourse.books.length 
      },
      "Suggested book deleted successfully from the course."
    )
  );
});




// const updateCourseHandbook = asyncHandler(async (req, res) => {
//   const { courseId } = req.params;
//   const { handbook } = req.body;
//   const userId = req.user?._id;
//   const role = req.user?.role;

//   // Auth check
//   if (!userId) {
//     throw new apiError(401, "Unauthorized");
//   }

//   // Course ID validation
//   if (!courseId) {
//     throw new apiError(400, "Course ID is required");
//   }

//   if (!mongoose.Types.ObjectId.isValid(courseId)) {
//     throw new apiError(400, "Invalid Course ID");
//   }

//   // Handbook validation
//   if (!handbook) {
//     throw new apiError(400, "Handbook URL is required");
//   }

//   // Role-based query
//   const query = { _id: courseId };

//   // Moderator → only own courses
//   if (role === "moderator") {
//     query.createdBy = userId;
//   }

//   // Only admin or moderator allowed
//   if (role !== "admin" && role !== "moderator") {
//     throw new apiError(403, "Forbidden");
//   }

//   // ONE DB CALL
//   const updatedCourse = await Course.findOneAndUpdate(
//     query,
//     { $set: { handbook } },
//     {
//       new: true,
//       runValidators: true,
//       select: '+handbook +handbook.publicId'
//     }
//   );

//   if (!updatedCourse) {
//     throw new apiError(
//       403,
//       "Course not found or you are not authorized to update it"
//     );
//   }

//   res.status(200).json(
//     new apiResponse(
//       200,
//       {updatedCourseHandbook : updatedCourse.handbook},
//       role === "admin"
//         ? "Course handbook updated successfully by admin"
//         : "Course handbook updated successfully by moderator"
//     )
//   );
// });

const updateCourseHandbook = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { handbook } = req.body; // Expecting: { name, fileUrl, publicId }
  const userId = req.user?._id;
  const role = req.user?.role;
  
  // Check for the 'access' flag in the authenticated user
  const hasAccess = req.user?.access === true;

  // 1. Strict Authorization Check
  // If the user is NOT an admin AND does NOT have the access flag, block them
  if (role !== "admin" && !hasAccess) {
    throw new apiError(403, "Forbidden: You do not have the required access to update the handbook.");
  }

  // 2. Data Validation
  if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
    throw new apiError(400, "Valid Course ID is required");
  }

  if (!handbook ) {
    throw new apiError(400, "A valid handbook object is required");
  }


  // 3. Database Query
  // Admin: Can update any course
  // Others: Must be the creator AND the course must be in 'draft' status
  const query = { _id: courseId };
  
  if (role !== "admin") {
    query.createdBy = userId;
    query.status = "draft";
  }

  // 4. Atomic Update Operation
  const updatedCourse = await Course.findOneAndUpdate(
    query,
    { $set: { handbook } }, // Overwrites the existing handbook object
    {
      new: true,
      runValidators: true,
      select: 'handbook status' 
    }
  );

  // 5. Handle Failure
  if (!updatedCourse) {
    throw new apiError(
      404, 
      "Update failed: Course not found, you aren't the owner, or it's no longer a draft."
    );
  }

  res.status(200).json(
    new apiResponse(
      200,
      { updatedCourseHandbook: updatedCourse.handbook },
      "Course handbook updated successfully"
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
  const isAdmin = req.user?.role === "admin";
  const hasAccess = req.user?.access === true;

  if (!courseId) {
    throw new apiError(400, "missing Course ID");
  }

  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    throw new apiError(400, "Invalid Course ID format");
  }


  if (!userId) {
    throw new apiError(401, "Unauthorized");
  }

  // 1. Account Access Check (Pre-DB)
  if (!isAdmin && !hasAccess) {
    throw new apiError(403, "Your account access is restricted.");
  }

  // 2. Prepare the Atomic Query
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const query = { _id: courseId };
  if (!isAdmin) {
    query.createdBy = userId;
    query.status = "draft";
    query.createdAt = { $gt: oneYearAgo };
  }

  // --- ATOMIC OPERATION: ONE DB CALL ---
  const deletedCourse = await Course.findOneAndDelete(query);

  // 3. Error Diagnosis (Only runs if the ONE call above returned nothing)
  if (!deletedCourse) {
    const existing = await Course.findById(courseId); // Second call ONLY on failure
    if (!existing) throw new apiError(404, "Course not found.");
    
    // Logic to explain WHY the one-call delete failed
    if (existing.status === "approved") throw new apiError(403, "Cannot delete non-draft courses.");
    if (new Date(existing.createdAt) < oneYearAgo) throw new apiError(403, "Course is over 1 year old.");
    throw new apiError(403, "Unauthorized deletion attempt.");
  }

  // 4. Cleanup User Stats
  const updatedUser = await User.findByIdAndUpdate(
    deletedCourse.createdBy,
    { $pull: { myCourses: deletedCourse._id }, $inc: { myCourseCount: -1 } },
    { new: true }
  );

  res.status(200).json(new apiResponse(200, { updatedUser }, "Deleted successfully."));
});



export { userCourseSearch,fullCourseDetailsForEdit, fullCourseDetails,getCourseByCreatorId, createCourse, updateCourseInfo, uploadImage, uploadFile, deleteFile, updateCourseMaterials, updateCourseTasks, updateCourseAssessments, updateSuggestedBooks, updateCourseHandbook, deleteCourseHandbook, deleteCourse , addNewMaterial, deleteMaterial, addNewTask, deleteTask, addNewAssessment, deleteAssessment, addNewSuggestedBook, deleteSuggestedBook };