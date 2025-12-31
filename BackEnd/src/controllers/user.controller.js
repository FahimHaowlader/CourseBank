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

  // Validate required fields
  if (!userId || !password) {
    throw new apiError(400, "Please provide userId and password");
  }

  // Find user by userId
  const user = await User.findOne({ userId }).select("+password");
  if (!user) {
    throw new apiError(401, "Invalid userId or password");
  }

  // Check if user has access
  if (!user.access) {
    throw new apiError(403, "Your account does not have access");
  }

  // Check password
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new apiError(401, "Invalid userId or password");
  }

  // Generate access token
  const accessToken = user.generateAccessToken();

  // Set token in secure HTTP-only cookie
  res.cookie("accessToken", accessToken, {
    httpOnly: true,      // Cannot be accessed by JS (prevents XSS)
    secure: process.env.NODE_ENV === "production", // Only HTTPS in prod
    sameSite: "Strict",  // CSRF protection
    maxAge: 1000 * 60 * 60 * 24 * 2, // 2 day in milliseconds
  });

  // Optional: return minimal user info
  const userInfo = {
    userId: user.userId,
    role: user.role,
    access: user.access,
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



export { createUser, updateUserInfo, userLogin, deleteUser, getAllUserSearch };

