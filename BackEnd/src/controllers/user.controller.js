//utils import
import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";


//model import
import  User  from "../models/user.model.js";

const createContributors = asyncHandler(async (req, res) => {
  const { contributor } = req.body;
  
  // Destructure req.user (populated by your auth middleware)
  const { role, access, userId: adminId } = req.user;

  // 1. Authorization & Access Guard
  if (!access) {
    throw new apiError(403, "Your account access is restricted.");
  }

  if (role !== "admin" && role !== "moderator") {
    throw new apiError(403, "Only admins and moderators can create contributors");
  }

  // 2. Semester/Department Logic for Moderators
  if (role === "moderator") {
    // Safety check: ensure both IDs exist and are long enough
    if (!contributor?.userId || !adminId || contributor.userId.length < 11 || adminId.length < 11) {
      throw new apiError(400, "Invalid User ID format for departmental verification");
    }

    // Extracting the 4th to 11th character (Indices 3 to 11)
    const contributorAccess = contributor.userId.substring(3, 11);
    const moderatorAccess = adminId.substring(3, 11);

    if (contributorAccess !== moderatorAccess) {
      throw new apiError(403, "Moderators can only create contributors for their own semester/department");
    }
  }

  // 3. Strict Validation
  const requiredFields = ['userId', 'password', 'department', 'year', 'semester', 'degree'];
  const missingFields = requiredFields.filter(field => !contributor?.[field]);

  if (missingFields.length > 0) {
    throw new apiError(400, `Missing required fields: ${missingFields.join(', ')}`);
  }

  if (contributor.userId.length !== 11) {
    throw new apiError(400, "userId must be exactly 11 characters long");
  }

  if (contributor.password.length < 6) {
    throw new apiError(400, "Password must be at least 6 characters long");
  }

  // 4. Duplicate Check (HTTP 409 Conflict)
  const existingUser = await User.findOne({ userId: contributor.userId });
  if (existingUser) {
    throw new apiError(409, "A contributor with this User ID already exists");
  }

  // 5. Creation
  // We spread the contributor data and explicitly set the role
  const newUser = await User.create({
    ...contributor,
    role: "contributor" 
  });

  if (!newUser) {
    throw new apiError(500, "Something went wrong while creating the contributor");
  }

  // 6. Response (Returning full user object including password as requested)
  return res.status(201).json(
    new apiResponse(201, newUser, "Contributor created successfully")
  );
});

const createModerators = asyncHandler(async (req, res) => {
  const { moderator } = req.body;
  const { role, access } = req.user;

  // 1. Authorization
  if (!access) throw new apiError(403, "Your account access is restricted.");
  if (role !== "admin") throw new apiError(403, "Only admins can create moderators");

  // 2. Validation for Moderator Data
  const requiredFields = ['userId', 'password', 'year', 'semester', 'degree'];
  if (!moderator || requiredFields.some(field => !moderator[field])) {
    throw new apiError(400, "Missing required fields for moderator setup");
  }

  if (moderator.userId.length < 11) {
    throw new apiError(400, "Moderator userId must be at least 11 characters");
  }

  // 3. Check if Moderator already exists
  const existingMod = await User.findOne({ userId: moderator.userId });
  if (existingMod) {
    throw new apiError(409, "A user with this Moderator ID already exists");
  }

  // 4. Generate Contributors for All Departments
  const allDepartments = [
    "arc", "cep", "cee", "cse", "eee", "fet", "ipe", "mee", "pme", "swe",
    "che", "gee", "mat", "ocg", "phy", "sta",
    "bmb", "fes", "geb",
    "anp", "bng", "eco", "eng", "pss", "pad", "scw", "soc",
    "ban"
  ];

  // Helper to generate 8-character small-case password
  const generatePassword = () => Math.random().toString(36).slice(-8).toLowerCase();

  // Extract last 8 characters of moderator ID
  const modIdSuffix = moderator.userId.slice(-8);

  const contributorsToCreate = allDepartments.map(dept => ({
    userId: `${dept}${modIdSuffix}`, // e.g., "cse" + "12345678"
    password: generatePassword(),    // 8-character lowercase string
    department: dept,
    year: moderator.year,
    semester: moderator.semester,
    degree: moderator.degree,
    role: "contributor"
  }));

  // 5. Bulk Insert Contributors (Ignore Existing)
  try {
    // { ordered: false } allows the operation to continue if some IDs already exist
    await User.insertMany(contributorsToCreate, { ordered: false });
  } catch (err) {
     // console.log("Bulk insert completed: Existing contributors were skipped.");
  }

  // 6. Create the Moderator
  const newModerator = await User.create({
    ...moderator,
    role: "moderator"
  });

  if(!newModerator) {
    throw new apiError(500, "Something went wrong while creating the moderator");
  }

  return res.status(201).json(
    new apiResponse(201, newModerator, "Moderator created and all departmental contributors generated.")
  );
});


const updateUserInfo = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const updateData = { ...req.body };
  const currentUserRole = req.user.role;

  //  // console.log("User ID to Update:", userId);
  //  // console.log("Update Data:", updateData);
  

  // Only admin can update roles
  if ("role" in updateData && currentUserRole !== "admin") {
    throw new apiError(403, "Only admin can update user roles");
  }

  // Prevent password updates here
  if ("password" in updateData) {
    delete updateData.password;
  }

  // ONE DB CALL
  const updatedUser = await User.findOneAndUpdate({userId}, updateData, {
    new: true,
    runValidators: true,
  }).select("-password");

  if (!updatedUser) {
    throw new apiError(404, "User not found");
  }

  res.status(200).json(
    new apiResponse(200, updatedUser, "User updated successfully")
  );
});


const userLogin = asyncHandler(async (req, res) => {
  const { userId, password } = req.body;
  //  // console.log("Login attempt for userId:", userId);
  //  // console.log("Request body:", req.body);

  // Validate required fields
  if (!userId || !password) {
    throw new apiError(400, "Please provide userId and password");
  }

  if(userId.length !== 11) {
    throw new apiError(400, "userId must be either 10 or 11 characters long");
  }
  if(password.length < 6) {
    throw new apiError(400, "userId and password must be at least 6 characters long");
  } 

  // Find user by userId
  const dbUser = await User.findOne({ userId }).select("+password");
  if (!dbUser) {
    throw new apiError(401, "Invalid userId or password");
  }
  //  // console.log("User found:", dbUser);

  // Calculate the cutoff (30 days ago)
const thirtyDaysAgo = new Date();
thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30); 


  // Check if user has access
  
  // This throws the error ONLY if the date is FURTHER in the past than 30 days
if (!dbUser.access && dbUser.status === 'approved' && dbUser?.approvedAt && new Date(dbUser.approvedAt) < thirtyDaysAgo) {
    throw new apiError(403, "Access to this account is currently restricted.");
}

  // Check password
  const isPasswordValid = await dbUser.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new apiError(401, "Invalid userId or password");
  }

  // Generate access token
  const accessToken = dbUser.generateAccessToken();

  // Set token in secure HTTP-only cookie
  res.cookie("accessToken", accessToken, {
  httpOnly: true,      // Prevents JavaScript access (XSS defense)
  secure: false, // true in production (requires HTTPS), false on local HTTP
  sameSite:  "none" , // "none" allows cross-origin cookies in production
  path: "/", 
  maxAge: 1000 * 60 * 60 * 24 * 2, // 2 days
});

  // Set token in secure HTTP-only cookie for production
  // res.cookie("accessToken", accessToken, {
  //   httpOnly: true,      // Cannot be accessed by JS (prevents XSS)
  //   secure: process.env.NODE_ENV === "production", // Only HTTPS in prod
  //   sameSite: "Strict",  // CSRF protection
  //   maxAge: 1000 * 60 * 60 * 24 * 2, // 2 day in milliseconds
  // });

  // Optional: return minimal user info
  const userInfo = {
    _id: dbUser._id,
    userId: dbUser.userId,
    role: dbUser.role,
  };

  res.status(200).json(
    new apiResponse(
      200,
      { user: userInfo },
      "User logged in successfully"
    )
  );
});


const deleteContributor = asyncHandler(async (req, res) => {
  const { contributorUserId } = req.params;
  const role = req.user?.role;
  const access = req.user?.access;

  // 1. Authorization Check
  if (!access) {
    throw new apiError(403, "Your account access is restricted.");
  }

  // Only admin can delete users
  if (role !== "admin" && role !== "moderator") {
    throw new apiError(403, "Only admin and moderator can delete users");
  }

  if (role === "moderator") {
    // Safety check: ensure both IDs exist and are long enough
    if (!contributorUserId || !req.user.userId || contributorUserId.length < 11 || req.user.userId.length < 11) {
      throw new apiError(400, "Invalid User ID format for departmental verification");
    }

    // Extracting the 4th to 11th character (Indices 3 to 11)
    const targetAccess = contributorUserId.substring(3, 11);
    const moderatorAccess = req.user.userId.substring(3, 11);

    if (targetAccess !== moderatorAccess) {
      throw new apiError(403, "Moderators can only delete contributors from their own semester/department");
    }
  }

   // Validate userId format
   if (!contributorUserId || contributorUserId.length !== 11) {
     throw new apiError(400, "Invalid User ID format");
   }
   
   // Check if user exists
   const userToDelete = await User.findOne({ userId: contributorUserId });
   if (!userToDelete) {
     throw new apiError(404, "User not found");
   }

   // Prevent moderators from deleting other moderators or admins
   if (req.user.role === "moderator" && ["admin", "moderator"].includes(userToDelete.role)) {
     throw new apiError(403, "Moderators cannot delete other moderators or admins");
   }

   // Prevent admins from deleting themselves
   if (req.user.role === "admin" && userToDelete._id.toString() === req.user._id.toString()) {
     throw new apiError(403, "Admins cannot delete their own account");
   }

   // All checks passed, proceed to delete the user
   const deletedUser = await User.findOneAndDelete({ userId : contributorUserId });

   if (!deletedUser) {
     throw new apiError(500, "Something went wrong while deleting the user");
   }

  // Remove password before sending response
  // const responseUser = deletedUser.toObject();
  // delete responseUser.password;

  res
    .status(200)
    .json(new apiResponse(200, {}, "User deleted successfully"));
});

const deleteModerator = asyncHandler(async (req, res) => {
  const { moderatorUserId } = req.params;
  const role = req.user?.role;
  const access = req.user?.access;

  // 1. Authorization Check
  if (!access) {
    throw new apiError(403, "Your account access is restricted.");
  }

  // Only admin can delete moderators
  if (role !== "admin") {
    throw new apiError(403, "Only admin can delete moderators");
  }
  
   // Validate userId format
   if (!moderatorUserId || moderatorUserId.length !== 11) {
     throw new apiError(400, "Invalid User ID format");
   }
   
  

   // All checks passed, proceed to delete the user
   const deletedUser = await User.findOneAndDelete({ userId: moderatorUserId });

   if (!deletedUser) {
     throw new apiError(500, "Something went wrong while deleting the user");
   }

  res
    .status(200)
    .json(new apiResponse(200, {}, "Moderator deleted successfully"));
});

// const getModeratorByUserId = asyncHandler(async (req, res) => {
//   const { moderatorUserId } = req.params;
//   const { role, access, userId: requestorId } = req.user; // Rename for clarity
  

//   // 1. Authorization Check
  
//   if (!access ) {
//     throw new apiError(403, "Your account access is restricted.");
//   }

//   // Allow only Admin or the Moderator themselves
//   const isAdmin = role === "admin";
//   const isSelf = role === "moderator" && moderatorUserId === requestorId;

//   if (!isAdmin && !isSelf) {
//     throw new apiError(403, "You are not authorized to view these details");
//   }

//   // 2. Validate format (Checks length and 'mod' prefix)
//   if (!moderatorUserId || moderatorUserId.length !== 11 || !moderatorUserId.startsWith("mod")) {
//     throw new apiError(400, "Invalid Moderator ID format");
//   }

//   // 3. Database Query
//   const moderator = await User.findOne({ 
//     userId: moderatorUserId, 
//     role: "moderator" // Combined into query for performance
//   }).select("-password");

//   if (!moderator) {
//     throw new apiError(404, "Moderator not found");
//   }
  
//   res.status(200).json(
//     new apiResponse(200, moderator, "Moderator details retrieved successfully")
//   );
// });


const getModeratorByUserId = asyncHandler(async (req, res) => {
  const { moderatorUserId } = req.params;
  const { role, access, userId: requestorId } = req.user;

  // 1. Validate ID format first (good practice to fail early)
  if (!moderatorUserId || moderatorUserId.length !== 11 || !moderatorUserId.startsWith("mod")) {
    throw new apiError(400, "Invalid Moderator ID format");
  }

  // 2. Fetch the Moderator first to check their approval date
  const moderator = await User.findOne({ 
    userId: moderatorUserId, 
    role: "moderator" 
  }).select("-password");

  if (!moderator) {
    throw new apiError(404, "Moderator not found");
  }

  // 3. Logic: Check if within 30-day "Grace Period"
  const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
  const isWithinGracePeriod = 
    !moderator.approvedAt || 
    (new Date() - new Date(moderator.approvedAt)) < thirtyDaysInMs;

  // 4. Final Authorization Logic
  const isAdmin = role === "admin";
  const isSelf = moderatorUserId === requestorId;

  if (isAdmin) {
    // Admin MUST have access
    if (!access) {
      throw new apiError(403, "Admin access is restricted.");
    }
  } else if (isSelf) {
    // Moderator checking themselves: 
    // They can enter IF they have access OR they are within the 30-day grace period
    if (!access && !isWithinGracePeriod) {
      throw new apiError(403, "Your trial period has expired and your access is restricted.");
    }
  } else {
    // Someone else entirely
    throw new apiError(403, "You are not authorized to view these details");
  }

  // 5. Response
  res.status(200).json(
    new apiResponse(200, moderator, "Moderator details retrieved successfully")
  );
});


const getAllContributors= asyncHandler(async (req, res) => {
  const { parameter } = req.body;
  const { role, access: requesterAccess, year: adminYear, semester: adminSemester, degree: adminDegree } = req.user;
  // 1. Pagination Setup
  // Use query parameters or body parameters; default to page 1 and limit 15
  const page = parseInt(req.body.page) || 1;
  const limit = 12;
  const skip = (page - 1) * limit;
  //  // console.log("Search Parameter Received:", parameter,page);

  // 2. Authorization Guard
  if (!requesterAccess) {
    throw new apiError(403, "Your account access is restricted.");
  }

  if (role !== "admin" && role !== "moderator") {
    throw new apiError(403, "Only admins and moderators can search users.");
  }

  if (!parameter || typeof parameter !== "object") {
    throw new apiError(400, "A valid parameter object is required.");
  }

  const { userId, year, degree, semester, department, status, access } = parameter;

  // 3. Build the Filter Base
  const filter = {};

  filter.role = "contributor"; // We are only searching for contributors

  if (userId) {
    filter.userId = { $regex: userId, $options: "i" };
  }

  // 4. Apply Role-Based Logic
  if (role === "moderator") {
    filter.year = adminYear;
    filter.semester = adminSemester;
    filter.degree = adminDegree;
    
    // Moderators see active users in their scope
    // filter.access = true; 
    // filter.status = "active";

    if (department) filter.department = department;
    if (status) filter.status = status;
    if (access !== undefined) filter.access = access;
  } else {
    // Admins have global search access
    if (year) filter.year = year;
    if (degree) filter.degree = degree;
    if (semester) filter.semester = semester;
    if (department) filter.department = department;
    if (status) filter.status = status;
    if (access !== undefined) filter.access = access;
  }

  // 5. Database Query with Pagination
  // We run countDocuments and find in parallel for better performance
  const [totalContributors, contributors] = await Promise.all([
    User.countDocuments(filter),
    User.find(filter)
      .select("+password")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }) // Show newest users first
  ]);
//  // console.log("Total Contributors Found:", totalContributors);
//  // console.log("Contributors on Current Page:", contributors);
  // 6. Response with Metadata
  res.status(200).json(
    new apiResponse(
      200,
      { 
        contributors,
        totalContributors,
      },
      "Users retrieved successfully"
    )
  );
});

// This handler only runs if verifyJwt passes (Next() was called)
const getAllModerators = asyncHandler(async (req, res) => {
  const { parameter } = req.body;
  const { role, access: requesterAccess } = req.user;

  // 1. Strict Admin Authorization Guard
  if (!requesterAccess) {
    throw new apiError(403, "Your account access is restricted.");
  }

  // Only Admin can access this list.
  if (role !== "admin") {
    throw new apiError(403, "Access denied. Only administrators can view the moderators list.");
  }

  // 2. Pagination Setup (15 per page)
  const page = parseInt(req.body.page) || 1;
  const limit = 12;
  const skip = (page - 1) * limit;

  // 3. Build the Filter
  // Filter strictly by role: "moderator"
  const filter = { role: "moderator" };

   if (!parameter || typeof parameter !== "object") {
    throw new apiError(400, "A valid parameter object is required.");
  }
  const { userId, year, degree, semester, status, access } = parameter;

    // Partial search for userId (Case-insensitive)
    if (userId) {
      filter.userId = { $regex: userId, $options: "i" };
    }

    // Admins can search by academic batch/group
    if (year) filter.year = year;
    if (degree) filter.degree = degree;
    if (semester) filter.semester = semester;
    
    // Status and Access management
    if (status) filter.status = status;
    if (access !== undefined) filter.access = access;
  

  // 4. Database Query
  const [totalModerators, moderators] = await Promise.all([
    User.countDocuments(filter),
    User.find(filter)
      .select("+password +access +status ") // Include password, access, and status; exclude course counts for cleaner response
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
  ]);

  // 5. Response
  res.status(200).json(
    new apiResponse(
      200,
      { 
        moderators,
        totalModerators,
      },
      "Moderators retrieved successfully"
    )
  );
});

 const handleRefresh = asyncHandler(async (req, res) => {
    try {
        // req.user was attached by your verifyJwt middleware
        const user = req.user;

        if (!user) {
            // return res.status(401).json({ message: "User not found" });
             throw new apiError(401, "User not found"); 
        }

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        // Check if they lack access AND (are approved BUT it's been more than 30 days)
if (!user.access && user.status === 'approved' && new Date(user.approvedAt) < thirtyDaysAgo) {
    throw new apiError(403, "Your account access has expired as it was approved over 30 days ago.");
}
        res.status(200).json({
            success: true,
            data: { user },
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});



const requestForSubmitContributorsAccount = asyncHandler(async (req, res) => {
  const { role, access: requesterAccess, userId: requesterUserId, 
          year: modYear, semester: modSemester, degree: modDegree } = req.user;
  
  // 1. Identify Target Contributor
  // If Admin/Mod, they provide contributorId in body. If Contributor, use their own ID.
  
  const targetUserId = (role !== "contributor" && req.body.contributorUserId) 
    ? req.body.contributorUserId 
    : requesterUserId;

  // 2. Authorization Guard
  if (!requesterAccess) {
    throw new apiError(403, "Your account access is restricted.");
  }
  //  // console.log("Submission Request by:", role, "for userId:", targetUserId);
  
  // 3. Moderator Scope Guard
  // Moderators can only submit contributors from their own Year/Semester/Degree
  if (role === "moderator") {
     const contributorSuffix = targetUserId.slice(-8);
      const moderatorSuffix = requesterUserId.slice(-8);
      if (contributorSuffix !== moderatorSuffix) {
      throw new apiError(403, "Moderators can only submit contributors within their own semester scope.");
    }
  }

  // Fetch the target contributor from DB
  const targetUser = await User.findOne({ userId: targetUserId }).select("+approvedCourseCount +myCourseCount +status +access +year +semester +degree");
  if (!targetUser || targetUser.role !== 'contributor') {
    throw new apiError(404, "Contributor account not found.");
  }

  // 4. Status & Pre-Condition Checks
  if (targetUser.status !== 'active') {
    throw new apiError(400, "This account is already under review.");
  }

  // Logic: At least 3 approved courses
  if (targetUser.approvedCourseCount < 3) {
    throw new apiError(400, "At least 3 approved courses are required for submission.");
  }

  // Logic: Clean Slate (All courses must be approved)
  if (targetUser.myCourseCount !== targetUser.approvedCourseCount) {
    throw new apiError(400, "All uploaded courses must be approved before submission.");
  }

  // 5. Atomic Update
  const updatedUser = await User.findOneAndUpdate(
    { userId: targetUserId },
    { 
      $set: { 
        access: false,       // Always lock access on submission
        status: 'pending',
        submittedAt: new Date(),
      } ,
      $unset: {
        feedback: "", // Clear any previous feedback on new submission
        reviewedBy: "" // Clear any previous reviewer tag on new submission
    },
  },
    { new: true }
  );

  if (!updatedUser) {
    throw new apiError(500, "Something went wrong while updating the account.");
  }

  // 6. Response
  const message = role === "contributor" 
    ? "Your account has been submitted successfully." 
    : `Contributor account (${targetUser.userId}) has been submitted by ${role}.`;

  res.status(200).json(new apiResponse(200, {}, message));
});





const cancelContributorAccountSubmission = asyncHandler(async (req, res) => {
  const requester = req.user;
  const { feedback, contributorUserId } = req.body || {};

   // console.log("Cancel Submission Request Body:", req.body);

  // 1. Basic Auth & Access Guard
  if (!requester) {
    throw new apiError(401, "Authentication required");
  }

  // 2. Identify Target (Staff can provide a userId, Contributors default to self)
  const isStaff = ["admin", "moderator"].includes(requester.role);
  const isTargetingSelf = !contributorUserId || contributorUserId === requester?.userId;
  const targetUserId = isTargetingSelf ? requester.userId : contributorUserId;

  if (!requester.access && !isTargetingSelf) {
    throw new apiError(403, "Your account access is restricted.");
  }

  // 3. Permission & Scope Guards
  if (!isTargetingSelf) {
    if (!isStaff) {
      throw new apiError(403, "Only staff members can cancel other users' submissions.");
    }

    // Feedback is mandatory when a staff member cancels a contributor's work
    if (!feedback || feedback.trim().length === 0) {
      throw new apiError(400, "Feedback is required when canceling another user's submission.");
    }

    // Moderator Scope Check (Last 8 digits must match)
    if (requester.role === "moderator") {
      const contributorSuffix = targetUserId.slice(-8);
      const moderatorSuffix = requester.userId.slice(-8);
      if (contributorSuffix !== moderatorSuffix) {
        throw new apiError(403, "Moderators can only manage contributors within their own batch.");
      }
    }
  }

  // 4. Build Update Object
  const updateData = {
    access: true,         // Restore login access so they can fix errors
    status: 'active',     // Revert from 'pending' to 'active'
    submittedAt: null     // Reset submission timer
  };

  // 5. Audit & Feedback Logic
  if (!isTargetingSelf) {
    // STAFF ACTION: Add the reviewer ID and the required feedback
    updateData.reviewedBy = requester._id;
    updateData.feedback = feedback;
  } else {
    // SELF ACTION: Reset feedback and remove the reviewer tag
    updateData.feedback = "";
    // No reviewedBy added for self-cancellation
  }

  // 6. Atomic Update
  const updatedUser = await User.findOneAndUpdate(
    { 
      userId: targetUserId, 
      status: 'pending' 
    },
    { 
      $set: updateData,
      // If self-canceling, ensure we remove any old reviewedBy ID from the document
      ...(isTargetingSelf && { $unset: { reviewedBy: "" } })
    },
    { new: true }
  );

  if (!updatedUser) {
    throw new apiError(404, "Target user not found or account is not in 'pending' state.");
  }



  // 7. Response
  const successMessage = isTargetingSelf 
    ? "Your account submission has been canceled successfully." 
    : `Submission for contributor ${targetUserId} has been canceled by ${requester.role}.`;

  res.status(200).json(
    new apiResponse(200, {}, successMessage)
  );
});


const approveContributorAccountSubmission = asyncHandler(async (req, res) => {
  const { contributorUserId } = req.body;
  const { role, _id: reviewerId, userId: reviewerUserId, access: requesterAccess } = req.user;
 // console.log("Approval Request Body:", req.body);  
  // 1. Authorization Guard
  if (!requesterAccess) {
    throw new apiError(403, "Your account access is restricted.");
  }

  // 2. Validate Target Input
  if (!contributorUserId || contributorUserId.trim().length !== 11) {
    throw new apiError(400, "A valid 11-character Contributor User ID is required.");
  }

  if (role !== "admin" && role !== "moderator") {
    throw new apiError(403, "Unauthorized: Only admins or moderators can approve contributors.");
  }

  if (role === "moderator"){
    const contributorSuffix = contributorUserId.slice(-8);
      const moderatorSuffix = reviewerUserId.slice(-8);
      if (contributorSuffix !== moderatorSuffix) {
        throw new apiError(403, "Moderators can only manage contributors within their own batch.");
      }

  }

   // console.log("hi")

  // 3. Find the Target Contributor
  const targetContributor = await User.findOne({ 
    userId: contributorUserId, 
    role: "contributor" 
  }).select("+myCourseCount +approvedCourseCount +status +access");

  if (!targetContributor) {
    throw new apiError(404, "Contributor account not found.");
  }

  if (targetContributor.status !== "pending") {
    throw new apiError(400, "Only accounts in 'pending' status can be approved.");
  }

  if (!targetContributor.approvedCourseCount || targetContributor.approvedCourseCount < 3 ) {
    throw new apiError(400, "Contributor must have at least 3 approved courses to be eligible for approval.");
  }

  if (targetContributor.myCourseCount !== targetContributor.approvedCourseCount) {
    throw new apiError(400, "All uploaded courses must be approved before the contributor can be approved.");
  }

  const today = new Date().toDateString();
  // 4. Final Approval Update
  const approvedUser = await User.findOneAndUpdate(
    { 
      userId: contributorUserId, 
      status: "pending" 
    },
    { 
      $set: { 
        access: false,         // Set access false as per your flow (final lock)
        status: "approved", 
        reviewedBy: reviewerId,
        approvedAt: new Date(),
         feedback: "Your contributor account submission was approved on "+today+". You can now log in and see your courses for 30 days. If you have any questions, please contact to the moderators."
      },
    },
    { new: true }
  );

  if (!approvedUser) {
    throw new apiError(500, "Failed to approve account. Please try again.");
  }

  // 5. Response
  res.status(200).json(
    new apiResponse(
      200, 
      { userId: approvedUser.userId, status: approvedUser.status }, 
      "Contributor account has been approved and access is locked."
    )
  );
});

const requestForSubmitModeratorsAccount = asyncHandler(async (req, res) => {
  const { role, access: requesterAccess, userId: requesterUserId } = req.user;
  

  // 1. Identify Target Moderator
  // Admin can provide 'moderatorUserId' in body; Moderator defaults to their own ID
  const targetUserId = (role === "admin" && req.body.moderatorUserId) 
    ? req.body.moderatorUserId 
    :requesterUserId;

  // 2. Authorization Guard
  if (!requesterAccess) {
    throw new apiError(403, "Your account access is restricted.");
  }

  if(role === "moderator" && targetUserId !== requesterUserId) {
    throw new apiError(403, "Moderators can only submit their own accounts.");
  }

  if (role === "admin" && !targetUserId && targetUserId.length !== 11) {
    throw new apiError(400, "Admin must provide a valid moderatorUserId to submit.");
  }
 
  // Fetch the target moderator to get their specific userId
  const targetModerator = await User.findOne({ userId: targetUserId , role: "moderator",});
  if (!targetModerator || targetModerator.role !== "moderator") {
    throw new apiError(404, "Moderator account does not found.");
  }
  if (targetModerator.status !== 'active') {
    throw new apiError(400, "This account is already under review.");
  }
 // console.log("Target Moderator Found:", targetModerator.userId);
  // 3. Extract the last 8 digits of the target moderator's ID
  const modIdSuffix = targetModerator.userId.slice(-8);

  // 4. Find all contributors associated with this suffix
  // Matches any userId ending with the 8-digit suffix (e.g., cse12345678)
  const associatedContributors = await User.find({
    role: "contributor",
    userId: { $regex: `${modIdSuffix}$` }
  });

  if (associatedContributors.length === 0) {
    throw new apiError(404, "No departmental contributor accounts found .");
  }

   // console.log(`Found ${associatedContributors.length} associated contributors for moderator ${targetUserId}`);

  // 5. Verify all contributors are 'approved'
  const unapprovedUsers = associatedContributors.filter(
    (user) => user.status !== "approved"
  );
 // console.log(`Unapproved contributors count: ${unapprovedUsers.length}`);
  if (unapprovedUsers.length > 0) {
    throw new apiError(
      400, 
      `${unapprovedUsers.length} departmental accounts are not yet approved.`
    );
  }
   // console.log("All associated contributors are approved. Proceeding with moderator submission." ,{ userId: targetUserId });
  // 6. Update Moderator Account (Always set access: false)   
  const updatedModerator = await User.findOneAndUpdate(
    { userId: targetUserId },
    { 
      $set: { 
        access: false,       // <--- Always false regardless of who hits the endpoint
        status: 'pending',
        submittedAt: new Date()
      },
        $unset: {
          reviewedBy: "",
          feedback: ""
        } 
    },
    { new: true }
  );

  if(!updatedModerator) {
    throw new apiError(500, "Something went wrong while submitting the moderator account");
  }

  // 7. Final Response
  const message = role === "admin" 
    ? "Admin has successfully submitted and locked this moderator account." 
    : "Your account has been submitted and locked for review.";

  res.status(200).json(new apiResponse(200, updatedModerator, message));
});


const cancelModeratorAccountSubmission = asyncHandler(async (req, res) => {
  const requester = req.user;
  const { userId } = req.body; // userId is the target's userId string

  // 1. Basic Auth & Access Guard
  if (!requester) {
    throw new apiError(401, "Authentication required");
  }

  if (!requester.access && userId !== requester.userId) {
    throw new apiError(403, "Your account access is restricted.");
  }

  // 2. Identify Target and Authorization
  // If no userId is provided in body, assume the requester is targeting themselves
  const isTargetingSelf = !userId || userId === requester.userId;
  const targetUserId = isTargetingSelf ? requester.userId : userId;

  // 3. Permission Logic
  if (!isTargetingSelf) {
    // Only Admin can cancel someone else's submission
    if (requester.role !== "admin") {
      throw new apiError(403, "Only admins can cancel other users' submissions.");
    }
    // Admin MUST provide feedback when canceling others
    if (role === "admin" && (!feedback || feedback.trim().length === 0)) {
      throw new apiError(400, "Feedback is required when canceling another user's submission.");
    }
  }

  // 4. Build Update Object
  const updateData = {
    access: true,         // Restore login access
    status: 'active',     // Revert status to active/editable
    submittedAt: null     // Clear the submission timestamp
  };

  // Only attach feedback if it was provided (Admins canceling others)
  if (requester.role === "admin" && !isTargetingSelf) {
    updateData.feedback = req.body.feedback;
  }else {
    updateData.feedback = "" ; // Remove feedback if canceling self or no feedback provided
  }

  // 5. Atomic Update
  // We filter by targetUserId and ensure the account is currently 'pending'
  const updatedUser = await User.findOneAndUpdate(
    { 
      userId: targetUserId, 
      status: 'pending' 
    },
    { 
      $set: updateData 
    },
    { new: true }
  );

  if (!updatedUser) {
    throw new apiError(404, "Target user not found or account is not in 'pending' state.");
  }

  // 6. Response
  const successMessage = isTargetingSelf 
    ? "Your account submission has been canceled successfully." 
    : `Submission for user ${targetUserId} has been canceled by Admin.`;

  res.status(200).json(
    new apiResponse(200, {}, successMessage)
  );
});

const approveModeratorAccountSubmission = asyncHandler(async (req, res) => {
  const { moderatorUserId } = req.body; 
  const { role, access: requesterAccess, _id: adminId } = req.user;
 

  // 1. Authorization Guard
  if (!requesterAccess) {
    throw new apiError(403, "Your account access is restricted.");
  }

  if (role !== "admin") {
    throw new apiError(403, "Access denied. Only administrators can approve moderator accounts.");
  }

  // 2. Validate Input
  // Added trim() to prevent whitespace issues
  if (!moderatorUserId || moderatorUserId.trim().length !== 11) {
    throw new apiError(400, "A valid 11-character Moderator User ID is required.");
  }

  const modIdSuffix = moderatorUserId.slice(-8);

  // 3. Verify Associated Contributors
  const associatedContributors = await User.find({
    role: "contributor",
    userId: { $regex: `${modIdSuffix}$` }
  });

  // Safety check: Ensure the sub-accounts actually exist
  if (associatedContributors.length === 0) {
    throw new apiError(404, "No departmental contributor accounts found for this Moderator ID.");
  }

  // 4. Check for any non-approved contributors
  const unapprovedUsers = associatedContributors.filter(
    (user) => user.status !== "approved"
  );

  if (unapprovedUsers.length > 0) {
    throw new apiError(
      400, 
      `Approval failed. ${unapprovedUsers.length} departmental accounts are not yet approved.`
    );
  }

  // 5. Final Approval Update
  const approvedModerator = await User.findOneAndUpdate(
    { 
      userId: moderatorUserId, 
      role: "moderator", 
      status: "pending" 
    },
    { 
      $set: { 
        access: false,         // Locked as requested
        status: 'approved',     
        reviewedBy: adminId,    
        approvedAt: new Date() // Recommended: add a timestamp for the approval
      },
      $unset: { 
        feedback: ""            
      }
    },
    { new: true }
  );

  if (!approvedModerator) {
    throw new apiError(404, "Moderator account not found or is not in 'pending' state.");
  }

  res.status(200).json(
    new apiResponse(
      200, 
      approvedModerator, 
      "Moderator account has been approved and access is locked."
    )
  );
});

const LogOut = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    secure: false,
    sameSite: "none",
    path : "/"
  });

  res.status(200).json(new apiResponse(200, {}, "Logged out successfully"));
});


export {
  createContributors,
  createModerators,
  updateUserInfo,
  userLogin,
  deleteContributor,
  deleteModerator,
  getModeratorByUserId,
  getAllContributors,
  getAllModerators,
  handleRefresh,
  requestForSubmitContributorsAccount,
  cancelContributorAccountSubmission,
  approveContributorAccountSubmission,
  requestForSubmitModeratorsAccount,
  cancelModeratorAccountSubmission,
  approveModeratorAccountSubmission,
  LogOut
};
