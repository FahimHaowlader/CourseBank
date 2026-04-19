// const mongoose = require('mongoose');
// utils
import apiError from '../utils/apiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import apiResponse from '../utils/apiResponse.js';
import mongoose from 'mongoose';
import { deleteLocalFiles , deleteLocalFile } from '../utils/delete.js';
import { uploadOnCloudinary , deleteCloudinaryFileById } from '../utils/cloudinary.js';
import { v4 as uuidv4, validate } from 'uuid';
import { ObjectId } from 'mongodb';
// model
import Course from '../models/course.model.js';
import User from '../models/user.model.js';

// In-memory cache (shared across requests)
const userQueryCache = {};

// Helper function to get courses
async function getCourses(userId, parameters ={},page,sort ={}) {


  // Build query
    const query = {};
  for (const [key, value] of Object.entries(parameters)) {
    if (!value) continue;
    if (key === 'createdBy') {
      query.createdBy = new ObjectId(value);
    }
    if (typeof value === "number" && key !== "year") {
      query[key] = value;
    } else if (key === "year") {
      const year = Number(value);
      query.startingDate = {
        $gte: new Date(year, 0, 1),
        $lte: new Date(year, 11, 31, 23, 59, 59),
      };
    } else if (
      ["department", "degree", "type", "format","status"].includes(key)
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
    // console.log("Cache miss or expired for user:", userId);
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
  parameters.status = 'approved'; // Only show approved courses to users
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

  if(!hasAccess){
    throw new apiError(403, "Your account access is restricted. You cannot edit courses.");
  }

  // 2. Fetch course with required hidden fields (Added status and createdAt)
  const course = await Course.findById(courseId).select(
    '+description +instructorDepartment +instructorImage +createdBy +books +materials +tasks +assessments +handbook +status +createdAt'
  );

  if (!course) {
    throw new apiError(404, "Course not found");
  }
  console.log("Course Creator ID:", course);  

  // 3. Define Logic Flags
  const isOwner = course.createdBy.toString() === userId.toString();
  const isAdmin = userRole === 'admin';


 // Ensure userId is a string
const uid = req.user.userId.toString();



// 1. Check Year (index 3 to 6)
const matchesYear = uid.substring(3, 7) === course.hscYear.toString();

// 2. Check Program Level (index 7 and 8)
const programCode = uid.substring(7, 9);
let matchesProgram = false;

if (programCode === '01' && course.degree === 'bachelors') {
    matchesProgram = true;
} else if (programCode === '02' && course.degree === 'masters') {
    matchesProgram = true;
} else if (programCode === '03' && course.degree === 'phd') {
    matchesProgram = true;
}



// 3. Check Semester (index 9 and 10)
const matchesSemester = uid.substring(9, 11) === course.semester.toString();



// Final Moderator Logic
const isModerator = 
    userRole === 'moderator' && 
    matchesYear && 
    matchesProgram && 
    matchesSemester;

  // Calculate if the course is older than 1 year
  const oneYearInMs = 365 * 24 * 60 * 60 * 1000;
  const isExpired = Date.now() - new Date(course.createdAt).getTime() > oneYearInMs;

  // console.log("User Role:", isExpired);

  // --- PERMISSION & LOCK LOGIC ---

  // Rule 1: Identity & General Access
  if (!isAdmin && !(isOwner && hasAccess) && !(isModerator && hasAccess))  {
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

  // Auth checks
  if (!requesterId) {
    throw new apiError(401, "Unauthorized");
  }

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

 if (submittedAccount && req.user.approvedAt && new Date(req.user.approvedAt) < thirtyDaysAgo) {
    throw new apiError(403, "Your account was approved more than 30 days ago.");
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
const createCourse = asyncHandler(async (req, res, next) => {
  const userId = req.user?._id;
  const userRole = req.user?.role;
  const hasAccess = req.user?.access === true;
  const data = req.body;

  // 1. Initial Authorization & Validation
  if (!userId) throw new apiError(401, "Unauthorized");
  if (!hasAccess) {
    throw new apiError(403, "Your account access is restricted. You cannot create courses.");
  }
  if (!data || Object.keys(data).length === 0) {
    throw new apiError(400, "Course data is required");
  }

  const { title, courseCode, startingDate, instructorName, type, format, department, semester, degree, hscYear } = data;

  if (!title || !courseCode || !startingDate || !instructorName || !type || !format || !department || !semester || !degree || !hscYear) {
    throw new apiError(400, "All required course fields must be provided");
  }

  // 2. Duplicate Check (Ownership-based)
  if (userRole !== "admin" && userRole !== "moderator") {
    const duplicate = await Course.findOne({ 
      courseCode: courseCode.trim(), 
      createdBy: userId 
    });
    if (duplicate) throw new apiError(409, `You already created course ${courseCode}`);
  }

  const year = new Date(startingDate).getFullYear();

  // 3. START TRANSACTION
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 4. Create Course
    const newCourse = new Course({ 
      ...data, 
      year, 
      createdBy: userId,
      status: "draft" // New courses start as draft and require approval
    });

    const savedCourse = await newCourse.save({ session });

    // 5. Update User Profile (Push to array and increment count)
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: { myCourses: savedCourse._id },
        $inc: { myCourseCount: 1 }
      },
      { session, new: true }
    );

    if (!updatedUser) {
      throw new apiError(404, "User profile not found. Aborting creation.");
    }

    // 6. COMMIT
    await session.commitTransaction();
    session.endSession();

    res.status(201).json(new apiResponse(201, savedCourse, "Course created and pending review."));
    
  } catch (err) {
    // ROLLBACK on any error
    await session.abortTransaction();
    session.endSession();

    if (err.code === 11000) throw new apiError(400, "This Course Code is already in use.");
    throw new apiError(500, err.message || "Error creating course");
  }
});

const updateCourseInfo = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const {updatedData} = req.body;
  const userId = req.user?._id;
  const role = req.user?.role;
  const hasAccess = req.user?.access === true;

  // Auth check
  if (!userId) {
    throw new apiError(401, "Unauthorized");
  }

  // Course ID validation
  if (!courseId) {
    throw new apiError(400, "Course ID is required");
  }

  if (!hasAccess) {
    throw new apiError(403, "Your account access is restricted. You cannot edit courses.");
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
  if (role !== "admin" ) {
    query.createdBy = userId;
  }

  const updatedCourse = await Course.findOneAndUpdate(
    query,
    { $set: updatedData ,isEditedSinceFeedback : true },
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

const updateBasicInfo = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { updatedData } = req.body;
  const userId = req.user?._id;
  const role = req.user?.role;
  // console.log("Update Basic Info Request:", { courseId, updatedData, userId, role });
  // throw new apiError(500, "This endpoint is currently disabled for testing purposes.");
  // 1. Strict Authorization Check
  // User must be an Admin OR have the explicit 'access' flag
  const hasAccess = req.user?.access === true;

  if (!hasAccess) {
    throw new apiError(403, "Forbidden: You do not have the required access level to update course info.");
  }

  // 2. Data Validation
  if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
    throw new apiError(400, "Valid Course ID is required");
  }

  if (!updatedData || Object.keys(updatedData).length === 0) {
    throw new apiError(400, "No update data provided");
  }

  // 3. Block restricted academic fields
  // These fields are locked at creation and cannot be changed via basic update
  const restrictedFields = ["department", "semester", "degree", "createdBy"];
  for (const field of restrictedFields) {
    if (field in updatedData) {
      throw new apiError(
        400,
        `Updating the '${field}' field is restricted. Please contact an admin for changes.`
      );
    }
  }

  // 4. Database Query Logic
  // Admin: Can update any course at any time
  // Others: Must be the owner AND the course must be in 'draft' status
  const query = { _id: courseId };
  
  if (role !== "admin") {
    query.createdBy = userId;
    query.status = "draft";
  }

  // 5. Atomic Update
  const updatedCourse = await Course.findOneAndUpdate(
    query,
    { $set: updatedData ,isEditedSinceFeedback : true },
    {
      new: true,
      runValidators: true,
    }
  );

  // 6. Handle Unauthorized or Not Found
  if (!updatedCourse) {
    throw new apiError(
      404, 
      "Update failed: Course not found, you aren't the owner, or it's no longer a draft."
    );
  }

  res.status(200).json(
    new apiResponse(
      200,
      updatedCourse,
      role === "admin" 
        ? "Course info updated successfully by admin" 
        : "Course info updated successfully"
    )
  );
});


const updateDescription = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { description } = req.body; // Expecting { "description": "New course details..." }
  const userId = req.user?._id;
  const role = req.user?.role;
  
  // 1. Strict Authorization Check
  const hasAccess = req.user?.access === true;

  if (!hasAccess) {
    throw new apiError(403, "Forbidden: You do not have the required access to update the description.");
  }

  // 2. Data Validation
  if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
    throw new apiError(400, "Valid Course ID is required");
  }

  if ( !description) {
    throw new apiError(400, "Description content is required");
  }

  // 3. Database Query Logic
  // Admin: Can update any course.
  // Others: Must be the creator AND the course must be in 'draft' status.
  const query = { _id: courseId };
  
  if (role !== "admin") {
    query.createdBy = userId;
    query.status = "draft";
  }

  // 4. Atomic Update Operation
  const updatedCourse = await Course.findOneAndUpdate(
    query,
    { $set: { description,isEditedSinceFeedback : true } }, // Updates only the description field
    {
      new: true,
      runValidators: true,
      select: 'description status' 
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
      { updatedDescription: updatedCourse.description },
      "Course description updated successfully"
    )
  );
});


const updateInstructorInfo = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { instructor } = req.body; 
  const userId = req.user?._id;
  const role = req.user?.role;
  const hasAccess = req.user?.access === true;

  // 1. Strict Authorization Check
  if ( !hasAccess) {
    throw new apiError(403, "Forbidden: You do not have the required access level.");
  }

  // 2. Data Validation & Presence Check
  if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
    throw new apiError(400, "Valid Course ID is required");
  }

  if (!instructor || typeof instructor !== 'object') {
    throw new apiError(400, "A valid instructor info object is required");
  }

  // REQUIREMENT: Must have at least instructorName AND instructorDepartment
  if (!instructor.instructorName || !instructor.instructorDepartment) {
    throw new apiError(400, "Instructor update must include at least a Name and a Department");
  }

   // 3. Block restricted academic fields
  // These fields are locked at creation and cannot be changed via basic update
  const restrictedFields = ["department", "semester", "degree", "createdBy"];
  for (const field of restrictedFields) {
    if (field in instructor) {
      throw new apiError(
        400,
        `Updating the '${field}' field is restricted. Please contact an admin for changes.`
      );
    }
  }
// console.log("Update Instructor Info Request:", { courseId, instructor, userId, role });
  // 4. Database Query Logic
  const query = { _id: courseId };
  if (role !== "admin") {
    query.createdBy = userId;
    query.status = "draft";
  }


 

  // Correct way to update individual fields inside the object
const updatedCourse = await Course.findOneAndUpdate(
  query,
  { 
    $set: { 
      instructorName: instructor.instructorName, 
      instructorDepartment: instructor.instructorDepartment,
      isEditedSinceFeedback: true 
    } 
  }, 
  { new: true, runValidators: true,select: 'instructorName instructorDepartment status'  }
);

  // 6. Handle Failure
  if (!updatedCourse) {
    throw new apiError(
      404, 
      "Update failed: Course not found, you aren't the owner, or it's no longer a draft."
    );
  }

  res.status(200).json(
    new apiResponse(
      200,
      { updatedInstructor: updatedCourse.instructor },
      "Instructor information updated successfully"
    )
  );
});

const updateStartingDate = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { startingDate } = req.body;
  const userId = req.user?._id;
  const role = req.user?.role;
  const hasAccess = req.user?.access === true;

  if (!hasAccess) {
    throw new apiError(403, "Forbidden: Access denied.");
  }

  if (!startingDate) throw new apiError(400, "Starting date is required");
  const newDate = new Date(startingDate);

  // Fetch course to check for timeline conflicts
  const course = await Course.findById(courseId).select('assessments createdBy status');
  if (!course) throw new apiError(404, "Course not found");

  // Logic: Prevent start date from moving past existing assessments
  const conflict = course.assessments.find(asm => new Date(asm.date) < newDate);
  if (conflict) {
    throw new apiError(400, `Conflict: Assessment "${conflict.title}" occurs before this new date.`);
  }

  const query = { _id: courseId };
  if (role !== "admin") {
    query.createdBy = userId;
    query.status = "draft";
  }
  const year = new Date(startingDate).getFullYear();

  const updatedCourse = await Course.findOneAndUpdate(
    query,
    { $set: { startingDate: newDate, year , isEditedSinceFeedback : true } },
    { new: true, runValidators: true, select: 'startingDate status' }
  );

  if (!updatedCourse) throw new apiError(404, "Update failed: Course locked or unauthorized.");

  res.status(200).json(new apiResponse(200, { updatedStartingDate: updatedCourse.startingDate }, "Date updated"));
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
  const hasAccess = req.user?.access === true;

   // 1. Strict Authorization Check
   if (!hasAccess) {
    throw new apiError(403, "Forbidden: You do not have the required access to update course materials.");
  }

  if (!userId) throw new apiError(401, "Unauthorized");
  if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
    throw new apiError(400, "Valid Course ID is required");
  }

  if (!Array.isArray(materials)) {
    throw new apiError(400, "Materials must be an array");
  }

  // Define authorization query
  const query = { _id: courseId };
  if (role !== "admin") {
    query.createdBy = userId;
    query.status = "draft";
  } 

  // ONE DB CALL - Fixed Options and Select
  const updatedCourse = await Course.findOneAndUpdate(
    query,
    { $set: { materials,isEditedSinceFeedback : true } },
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
  if (!hasAccess) {
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
      $push: { materials: material } ,
      $set : {isEditedSinceFeedback : true }
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
  if ( !hasAccess) {
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
      $pull: { materials: { _id: materialId } } ,
      $set : {isEditedSinceFeedback : true }
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
  const hasAccess = req.user?.access === true;

   // 1. Strict Authorization Check
   if (!hasAccess) {
    throw new apiError(403, "Forbidden: You do not have the required access to update course tasks.");
  }

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
  if (role !== "admin") {
    query.createdBy = userId;
    query.status = "draft";
  }

  
  // ONE DB CALL
  const updatedCourse = await Course.findOneAndUpdate(
    query,
    { $set: { tasks, isEditedSinceFeedback : true } },
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
  if ( !hasAccess) {
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
  if (!task.name || !task.fileUrl || !task.id) {
    throw new apiError(400, "Task name, file URL, and ID are required");
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
      $push: { tasks: task } , // Appends the new task object to the existing array
      $set : {isEditedSinceFeedback : true }
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
  if (!hasAccess) {
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
      $pull: { tasks: { _id: taskId } } ,
      $set : {isEditedSinceFeedback : true }
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
  const hasAccess = req.user?.access === true;

   // 1. Strict Authorization Check
   if (!hasAccess) {
    throw new apiError(403, "Forbidden: You do not have the required access to update course assessments.");
  }

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
  if (role !== "admin") {
    query.createdBy = userId;
    query.status = "draft";
  }

  
  

  // ONE DB CALL
  const updatedCourse = await Course.findOneAndUpdate(
    query,
    { $set: { assessments , isEditedSinceFeedback : true} },
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
  if (!hasAccess) {
    throw new apiError(403, "Forbidden: You do not have the required access to add assessments.");
  }

  // 2. Initial Validations
  if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
    throw new apiError(400, "Valid Course ID is required");
  }

  if (!assessment || typeof assessment !== 'object') {
    throw new apiError(400, "A valid assessment object is required");
  }

  if( !assessment.mark || !assessment.date || !assessment.type || !assessment.id || !assessment.fileUrl){ 
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
      $push: { assessments: assessment } ,
      $set :{ isEditedSinceFeedback : true } 
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
  if (!hasAccess) {
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
      $pull: { assessments: { _id: assessmentId } } ,
      $set : {isEditedSinceFeedback : true }
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
  const hasAccess = req.user?.access === true;

   // 1. Strict Authorization Check
   if (!hasAccess) {
    throw new apiError(403, "Forbidden: You do not have the required access to update suggested books.");
  }

  if (!userId) throw new apiError(401, "Unauthorized");
  if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
    throw new apiError(400, "Invalid Course ID");
  }

  if (!Array.isArray(books)) {
    throw new apiError(400, "Books must be an array");
  }

  const query = { _id: courseId };
  if (role !== "admin") {
    query.createdBy = userId;
    query.status = "draft";
  }
  

  const updatedCourse = await Course.findOneAndUpdate(
    query,
    { $set: { books ,isEditedSinceFeedback:true } }, // Overwrites existing books with the new list
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
  if (!hasAccess) {
    throw new apiError(403, "Forbidden: You do not have the required access to add suggested books.");
  }

  // 2. Data Validation
  if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
    throw new apiError(400, "Valid Course ID is required");
  }

  if (!book || typeof book !== 'object' ) {
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
      $push: { books: book }, // Appends the book object to the existing array
      $set: { isEditedSinceFeedback: true }
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
  if (!hasAccess) {
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
      $pull: { books: { _id: bookId } } ,
      $set: { isEditedSinceFeedback: true }
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
  if (!hasAccess) {
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
    { $set: { handbook,isEditedSinceFeedback:true } }, // Overwrites the existing handbook object
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
  const hasAccess = req.user?.access === true;
  const isAdmin = role === "admin";

   // 1. Strict Authorization Check
   if (!hasAccess) {
    throw new apiError(403, "Forbidden: You do not have the required access to delete the handbook.");
  }

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
  if (!isAdmin) {
    query.createdBy = userId;
    query.status = "draft";
  }

  // Only admin or moderator allowed


  // ONE DB CALL
 const updatedCourse = await Course.findOneAndUpdate(
  query,
  { $set : { isEditedSinceFeedback : true },
    $unset: { handbook: "" } 
   },                         // Removes the entire handbook field
  { new: true ,
  runValidators: true,}
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
  const isAdmin = role === "admin";
  const hasAccess = req.user?.access === true;

  // 1. Basic Validation
  if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
    throw new apiError(400, "A valid Course ID is required.");
  }

  if (!userId) throw new apiError(401, "Unauthorized");
  if (!hasAccess) throw new apiError(403, "Your account access is restricted.");

  // 2. Prepare the Query Logic
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const query = { _id: courseId };
  
  if (!isAdmin) {
    query.createdBy = userId;
    // Use $in to check for multiple possible statuses
    query.status = { $in: ["pending", "draft"] }; 
    query.createdAt = { $gt: oneYearAgo };
  }

  // 3. START TRANSACTION
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 4. ATOMIC DELETE
    // We use .session(session) to include this in the transaction
    const deletedCourse = await Course.findOneAndDelete(query, { session,select: 'createdBy' });

    // 5. If Delete Failed, Diagnose WHY (Outside Transaction context is fine for read-only)
    if (!deletedCourse) {
      const existing = await Course.findById(courseId);
      if (!existing) throw new apiError(404, "Course not found.");
      
      if (!isAdmin) {
        if (existing.createdBy.toString() !== userId.toString()) 
          throw new apiError(403, "Unauthorized: You do not own this course.");
        if (existing.status !== "pending") 
          throw new apiError(403, "Cannot delete courses that are already approved.");
        if (new Date(existing.createdAt) < oneYearAgo) 
          throw new apiError(403, "Cannot delete courses older than 1 year.");
      }
      throw new apiError(403, "Deletion criteria not met.");
    }
    // console.log("Deleted Course:", deletedCourse);
    // 6. CLEANUP USER STATS
    // We use the 'createdBy' from the deleted document to ensure we hit the right user
    const updatedUser = await User.findByIdAndUpdate(
      deletedCourse.createdBy,
      { 
        $pull: { myCourses: deletedCourse._id }, 
        $inc: { myCourseCount: -1 } 
      },
      { session, new: true }
    );

    // If for some reason the User doc is missing, abort the deletion
    if (!updatedUser) {
      throw new apiError(404, "User profile not found. Deletion aborted.");
    }

    // 7. COMMIT EVERYTHING
    await session.commitTransaction();
    session.endSession();

    res.status(200).json(
      new apiResponse(200, null, "Course deleted successfully and profile updated.")
    );

  } catch (error) {
    // 8. ROLLBACK: If User update fails, the Course is RESTORED automatically
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
});



// submit handlers
  
const submitCourseForReview = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user?._id;
  const role = req.user?.role;
  const hasAccess = req.user?.access === true;

  // 1. Authorization
  if (!hasAccess) {
    throw new apiError(403, "Forbidden: Access denied.");
  }

  const courseIdValid = courseId && mongoose.Types.ObjectId.isValid(courseId);
  if (!courseIdValid) {
    throw new apiError(400, "Valid Course ID is required.");
  }


  const query = { _id: courseId ,
    status: "draft",
    isEditedSinceFeedback: true
  };

  if (role !== "admin" && role !== "moderator") {
    query.createdBy = userId;
    
  }

  

  // 2. Fetch the Full Course Document from DB
  const course = await Course.findOne(query).select('handbook assessments');
  if (!course) {
    throw new apiError(404, "Course not found in the database.");
  }

  // 3. Database Validation Logic (The "BD" checks)
  
  // A. Handbook Check
  if (!course.handbook) {
    throw new apiError(400, "Incomplete: The course handbook must be uploaded before submission.");
  }

  // B. Assessment Check
  const assessments = course.assessments || [];

  // Check for Term Tests or Midterms (Matches: termtest-1, midterm2, etc.)
  const hasTermOrMid = assessments.some(asm => 
    /termtest|midterm/i.test(asm.type)
  );

  // Check for Quizzes (Matches: quiz-1, quiz-2, etc.)
  const hasQuiz = assessments.some(asm => 
    /quiz/i.test(asm.type)
  );

  // Check for Projects
  const hasProject = assessments.some(asm => 
    /project/i.test(asm.type)
  );

  // 4. Validate requirements
  if (!hasTermOrMid && !hasQuiz && !hasProject) {
    const missing = [];
    if (!hasTermOrMid) missing.push("Term Test/Midterm");
    if (!hasQuiz) missing.push("Quiz");
    if (!hasProject) missing.push("Project");

    throw new apiError(
      400, 
      `Incomplete Curriculum in DB: Missing ${missing.join(", ")}. Please add these to the course structure first.`
    );
  }

  const hasFinal = assessments.some(asm => 
    /final/i.test(asm.type)
  );

  if (!hasFinal) {
    throw new apiError(
      400, 
      "Incomplete Curriculum in DB: At least one Final assessment is required. Please add it to the course structure first."
    );
  }   

  // 5. Final Status Update
  // We only allow transition from 'draft' to 'pending'
  // const query = { 
  //   _id: courseId, 
  //   status: "draft" 
  // };
  
  // Ownership check for non-admins
  // if (role !== "admin") {
  //   query.createdBy = userId;
  // }

  const updatedCourse = await Course.findOneAndUpdate(
    query,
    { $set: { status: "pending",submittedAt : new Date(),isEditedSinceFeedback :false } },
    { 
      new: true, 
      runValidators: true,
      select: "title status submittedAt" 
    }
  );

  if (!updatedCourse) {
    throw new apiError(
      400, 
      "Submission failed: The course is either already under review or you are not the owner."
    );
  }

  res.status(200).json(
    new apiResponse(200, updatedCourse, "Course successfully verified from DB and submitted for review.")
  );
});


const cancelCourseSubmission = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { feedback } = req.body || {};  // Optional feedback message when canceling
  const userId = req.user?._id;
  const role = req.user?.role;
  const hasAccess = req.user?.access === true;

  // 1. Authorization & ID Validation

  if (!hasAccess) {
    throw new apiError(403, "Forbidden: Your account access is restricted.");
  }

  if((role === "admin" || role === "moderator") && !feedback) {
    throw new apiError(400, "Feedback is required when canceling a submission as a Moderator or Admin.");
  }

  if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
    throw new apiError(400, "Valid Course ID is required.");
  }

  // 2. Define the Cancellation Query
  // We ONLY allow cancellation if the status is currently 'pending'
  const query = { 
    _id: courseId, 
    status: "pending" 
  };

  // If not admin, you must be the owner to cancel your own submission
  if (role !== "admin" && role !== "moderator") {
    query.createdBy = userId;
  }

// 1. Prepare the update object
  const updateFields = {
    status: "draft",
    reviewedBy: userId,
    // We'll set this dynamically below
  };

  // 2. PRIVILEGE & FLAG LOGIC
  // If the user is a Moderator or Admin, they can edit ANY course.
  // If they are a regular user, they can only edit their OWN course.
  if (role === "moderator" || role === "admin") {
    // Moderators/Admins don't "trigger" the edited flag for themselves usually
    updateFields.isEditedSinceFeedback = false,
    updateFields.feedback = feedback; // Store the feedback from the moderator/admin

  } else {
    // If a regular user (CR/Student) edits, they must be the creator
    // IMPORTANT: When a user edits, we set this to TRUE 
    // so the Admin knows the feedback was addressed.
    updateFields.isEditedSinceFeedback = true;
  }

 
  // 3. Revert Status to Draft
  const updatedCourse = await Course.findOneAndUpdate(
    query,
    { 
      $set: updateFields,

       // Removes the timestamp since it's no longer submitted
    },
    { 
      new: true, 
      select: "title status isEditedSinceFeedback feedback" 
    }
  );

  // 4. Handle Failure
  if (!updatedCourse) {
    throw new apiError(
      400, 
      "Cancel failed: Course not found, not in pending status, or already approved/published."
    );
  }

  res.status(200).json(
    new apiResponse(
      200, 
      { courseId: updatedCourse._id, newStatus: updatedCourse.status }, 
      "Submission cancelled. The course is now back in Draft mode for editing."
    )
  );
});

const acceptSubmission = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const adminId = req.user?._id;
  const role = req.user?.role;
  const hasAccess = req.user?.access;

  // 1. Authorization
  if (!hasAccess || (role !== "admin" && role !== "moderator")) {
    throw new apiError(403, "Forbidden: Insufficient permissions to approve courses.");
  }

  if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
    throw new apiError(400, "Valid Course ID is required.");
  }

  // 2. START TRANSACTION
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 3. Atomic Update of Course
    // We select 'createdBy' so we know which User to update next
    const approvedCourse = await Course.findOneAndUpdate(
      { _id: courseId, status: "pending" },
      { 
        $set: {
          status: "approved",
          reviewedBy: adminId,
          isEditedSinceFeedback: false,
          feedback: "" 
        } 
      },
      { new: true, session, select: "title status createdBy" }
    );

    if (!approvedCourse) {
      throw new apiError(404, "Course not found or is not in 'pending' status.");
    }

    // 4. Update User Profile
    // Note: Since the course is now "Live", we usually keep it in 'myCourses' 
    // but maybe move it from a 'pending' list if your schema has one.
    const updatedUser = await User.findByIdAndUpdate(
      approvedCourse.createdBy,
      { 
        // Example logic: incrementing a 'totalApproved' counter
        $inc: { approvedCourseCount: 1 } 
      },
      { session, new: true }
    );

    if (!updatedUser) {
      throw new apiError(404, "Creator of this course no longer exists.");
    }

    // 5. COMMIT
    await session.commitTransaction();
    session.endSession();

    res.status(200).json(
      new apiResponse(200, approvedCourse, `Course "${approvedCourse.title}" published.`)
    );

  } catch (error) {
    // ROLLBACK
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
});


const administrativeCourseSearch = asyncHandler(async (req, res) => {
  const { parameters = {}, page = 1, sort = {} } = req.body;

  const currentUserId = req.user?._id;
  const role = req.user?.role;
  const hasAccess = req.user?.access === true;

  // 1. Authorization Check
  const isPrivileged = ["admin", "moderator"].includes(role);
  if (!hasAccess || !isPrivileged) {
    throw new apiError(403, "Forbidden: Administrative access required.");
  }

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

  if (parameters.createdBy) {
    const targetUser = await User.findOne({ userId : parameters.createdBy });
    
    if (!targetUser) {
      throw new apiError(404, "Target user not found.");
    }
    
    // console.log("AdministrativeCourseSearch - Target User:", targetUser);

    // Safety Check: Moderators can only view Contributors or themselves
    if (role === "moderator" && targetUser.role === "contributor" && targetUser.year !== req.user.year && targetUser.degree !== req.user.degree && targetUser.semester !== req.user.semester) {
      throw new apiError(403, "Moderators can only view courses from contributors.");
    }
    
    if( role === "moderator" && targetUser.role !== "contributor" && targetUser._id.toString() !== currentUserId.toString() ) {
      throw new apiError(403, "Moderators can only view their own courses.");
    }

    // Force the ID to be a string
    parameters.createdBy = targetUser._id.toString(); 
  }
  // parameters.status = 'draft'; // Only show courses that haven't been edited since feedback

  if (role === "moderator") {
    // parameters.hscYear = req.user.year;
    // parameters.degree = req.user.degree;
    // parameters.semester = req.user.semester;
  }
  // console.log("AdministrativeCourseSearch - Final Parameters:", parameters);
  // console.log("UserCourseSearch2 - Parameters after user filter:", parameters);
  const result = await getCourses(userId, parameters, page, sort );

  if (!result) throw new apiError(500, "Error fetching courses");

  res.status(200).json( new apiResponse(200, result, "Courses fetched successfully"));
});


export { userCourseSearch,fullCourseDetailsForEdit, fullCourseDetails,getCourseByCreatorId, createCourse, updateCourseInfo, uploadImage, uploadFile, deleteFile, updateCourseMaterials, updateCourseTasks, updateCourseAssessments, updateSuggestedBooks, updateCourseHandbook, deleteCourseHandbook, deleteCourse , addNewMaterial, deleteMaterial, addNewTask, deleteTask, addNewAssessment, deleteAssessment, addNewSuggestedBook, deleteSuggestedBook,updateBasicInfo,
updateDescription,updateInstructorInfo,updateStartingDate, submitCourseForReview, cancelCourseSubmission, acceptSubmission,administrativeCourseSearch };