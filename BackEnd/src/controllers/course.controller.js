// utils
import apiError from '../utils/apiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import apiResponse from '../utils/apiResponse.js';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';

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

  res.status(200).json(apiResponse(200, result, "Courses fetched successfully"));
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

  res.status(200).json(apiResponse(200, course, "Course details fetched successfully"));
});




// Controller(user)



















export { userCourseSearch, fullCourseDetails };
