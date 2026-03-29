//utils import
import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";


//model import
import  User  from "../models/user.model.js";

const createUser = asyncHandler(async (req, res) => {
  try {
    const {role :adminRole }  = req.user;
    // console.log("Admin Role:", adminRole  );
    // Only admin can create users
    if (adminRole !== "admin") {
      throw new apiError(403, "Only admin can create users");
    }
    const {user} = req.body;
    const { userId, password,role } = user;

    // Validate required fields
    if (!userId || !password || !role)  {
      throw new apiError(400, "Please provide all required fields");
    }

    if(userId.length !== 10 && userId.length !== 11) {
      throw new apiError(400, "userId must be either 10 or 11  characters long");
    }
      if(password.length < 6) {
        throw new apiError(400, "userId and password must be at least 6 characters long");
      }



    // Check if user already exists
    const existingUser = await User.findOne({ userId });
    if (existingUser) {
      throw new apiError(409, "User with this userId already exists");
    }

    // Create new user
    const newUser = new User(user)
    await newUser.save();

    res.status(201).json(new apiResponse(201, newUser, "User created successfully"));
  } catch (error) {
    console.error("Create User Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const updateUserInfo = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const updateData = { ...req.body };
  const currentUserRole = req.user.role;

  // console.log("User ID to Update:", userId);
  // console.log("Update Data:", updateData);
  

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
  // console.log("Login attempt for userId:", userId);
  // console.log("Request body:", req.body);

  // Validate required fields
  if (!userId || !password) {
    throw new apiError(400, "Please provide userId and password");
  }

  if(userId.length !== 10 && userId.length !== 11) {
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
  // console.log("User found:", dbUser);
  // Check if user has access
  if (!dbUser.access && dbUser.status === 'approved') {
    throw new apiError(403, "Your account does not have access");
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
    httpOnly: true,      // Cannot be accessed by JS (prevents XSS)
    // secure: process.env.NODE_ENV === "production", // Only HTTPS in prod
    secure: false, // Only HTTPS in prod
    sameSite: "lax", 
    path : "/", // CSRF protection
    maxAge: 1000 * 60 * 60 * 24 * 2, // 2 day in milliseconds
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


const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const role = req.user?.role;

  // Only admin can delete users
  if (role !== "admin") {
    throw new apiError(403, "Only admin can delete users");
  }

  // Validate userId
  // if (!mongoose.Types.ObjectId.isValid(userId)) {
  //   throw new apiError(400, "Invalid User ID");
  // }

  // Delete the user
  const deletedUser = await User.findOneAndDelete(userId);

  if (!deletedUser) {
    throw new apiError(404, "User not found");
  }

  // Remove password before sending response
  // const responseUser = deletedUser.toObject();
  // delete responseUser.password;

  res
    .status(200)
    .json(new apiResponse(200, {}, "User deleted successfully"));
});

const getAllUserSearch = asyncHandler(async (req, res) => {
  const role = req.user?.role;

  if (role !== "admin") {
    throw new apiError(403, "Only admin can search users");
  }

  // const { parameter } = req.body;g
  console.log("Search Parameters:", parameter);
  if (!parameter || typeof parameter !== "object") {
    throw new apiError(400, "parameter object is required");
  }

  const { userId, year, degree, semester, department } = parameter;

  // Build dynamic filter add
  const filter = {};

  // ✅ Partial, case-insensitive match
  if (userId) {
    filter.userId = { $regex: userId, $options: "i" };
  }

  if (year) filter.year = year;
  if (degree) filter.degree = degree;
  if (semester) filter.semester = semester;
  if (department) filter.department = department;

  const users = await User.find(filter)
    .select("+password"); // Include password for admin view

  res.status(200).json(
    new apiResponse(
      200,
      { users },
      "Users retrieved successfully"
    )
  );
});

// This handler only runs if verifyJwt passes (Next() was called)
 const handleRefresh = asyncHandler(async (req, res) => {
    try {
        // req.user was attached by your verifyJwt middleware
        const user = req.user;

        if (!user) {
            // return res.status(401).json({ message: "User not found" });
             throw new apiError(401, "User not found"); 
        }

        if (!user.access && user.status === 'approved') {
            throw new apiError(403, "Your account does not have access");
        }
        
        res.status(200).json({
            success: true,
            data: { user },
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

const requestForSubmitAccount = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const user = req.user;

  // 1. Standard Auth Guard
  if (!userId) {
    throw new apiError(401, "Authentication required");
  }

  // 2. NEW: Status Guard (Prevent re-submitting if already pending)
  if (user.status !== 'active') {
    throw new apiError(400, "Your account is already under review");
  }

  // 3. NEW: Access Guard (Prevent action if already restricted)
  if (user.access === false) {
    throw new apiError(400, "Account access is already restricted or submitted");
  }

  // 4. Logic: At least 3 approved courses
  if (user.approvedCourseCount < 3) {
    throw new apiError(400, "You need at least 3 approved courses to submit your account");
  }

  // 5. Logic: Clean Slate (All courses must be approved)
  if (user.myCourseCount !== user.approvedCourseCount) {
    throw new apiError(400, "All courses must be approved before submission");
  }

  // 6. Atomic Update
  const updatedUser = await User.findOneAndUpdate(
    { _id: userId },
    { 
      $set: { 
        access: false,
        status: 'pending',
        submittedAt: new Date(),
        // Optional: clear any previous rejection messages
      } 
    },
    { new: true }
  );

  if (!updatedUser) {
    throw new apiError(404, "User not found");
  }

  res.status(200).json(
    new apiResponse(200, { }, "Account submitted successfully")
  );
});

const cancelAccountSubmission = asyncHandler(async (req, res) => {
  const requester = req.user;
  const { feedback, userId } = req.body || {};
  const hasAccess = requester?.access === true;

  
  const isStaff = ["admin", "moderator"].includes(requester.role);
  const targetUserId = isStaff ? userId : requester._id;
  const isTargetingSelf = targetUserId?.toString() === requester?._id?.toString();

  if (!requester?._id) {
    throw new apiError(401, "Authentication required");
  }
  
  if (requester.status !== 'pending') {
    throw new apiError(400, "Your account is not currently pending submission.");
  }
  if (!hasAccess) {
     throw new apiError(403, "Your account access is restricted.");
  }

   if(isStaff && !isTargetingSelf && !hasAccess) {
     throw new apiError(403, "Forbidden: You do not have active access to manage other users.");
   }

   if(isStaff && !isTargetingSelf && !feedback) {
     throw new apiError(400, "Feedback is required when canceling another user's submission.");
   }

   if(requester.role === 'contributor' && requester.status !== 'pending') {
     throw new apiError(400, "Your account is not currently pending submission.");
   }
  // 1. Staff Validation: Feedback, Target ID, and Access check
  // if (isStaff) {
  //   // Staff must provide feedback
  //   if (!feedback || feedback.trim().length === 0) {
  //     throw new apiError(400, "Feedback is required for staff actions.");
  //   }
    
  //   // Staff must provide a target User ID
  //   if (!userId) {
  //     throw new apiError(400, "Target userId is required.");
  //   }

  //   // CRITICAL: Staff MUST have 'access: true' to cancel someone else's submission
  //   if (!isTargetingSelf && requester.access !== true) {
  //     throw new apiError(403, "Forbidden: You do not have active access to manage other users.");
  //   }
  // }

  // 2. Contributor Guard
  if (requester.role === 'contributor' && requester.status !== 'pending') {
    throw new apiError(400, "Your account is not currently pending submission.");
  }

  // 3. Atomic Update
  const updatedUser = await User.findOneAndUpdate(
    { 
      _id: targetUserId, 
      status: 'pending' 
    },
    { 
      $set: { 
        access: true,
        status: 'active'
      },
      $unset: { 
        submittedAt: "" 
      } 
    },
    { new: true }
  );

  if (!updatedUser) {
    throw new apiError(404, "User not found or not in 'pending' state.");
  }

  res.status(200).json(
    new apiResponse(200, {}, "Account submission canceled successfully")
  );
});



export { createUser, updateUserInfo, userLogin, deleteUser, getAllUserSearch, handleRefresh,requestForSubmitAccount, cancelAccountSubmission };