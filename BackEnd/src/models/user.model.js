import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    access: {
      type: Boolean,
      default: true,
    },
    department: {
      type: String,
      required: true,
      lowercase: true,
      select: false,
    },
    year: {
      type: Number,
      required: true,
      select: false,
    },
    semester: {
      type: Number,
      required: true,
      min: [1, "Semester must be at least 1est year 1est semester"],
      max: [62, "Semester cannot exceed 6th year 2nd semester"],
      select: false,
    },
    degree: {
      type: String,
      required: true,
      lowercase: true,
      enum: ["bachelors", "masters", "phd"],
      select: false,
    },
    email: {
      type: String,
      // required: true, {/* temporarily disabled for testing */}
      select: false,
    },
    password: {
      type: String,
      required: true,
      lowercase: true,
      select: false, // plain text password is not selectable
    },
    role: {
      type: String,
      enum: ["moderator", "contributor", "admin"],
      default: "contributor",
    },
    approvedCourseCount: {
      type: Number,
      default: 0,
    },
    myCourseCount: {
      type: Number,
      default: 0,
    },
    myCourses: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
        },
      ],
      select: false, // This now correctly applies to the field
    },
    status: {
      type: String,
      enum: ["active", "pending", "approved"],
      default: "active",
    },
    submittedAt: {
      type: Date,
      set: (value) => new Date(value),
      select: false,
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      select: false,
    },
    feedback: {
      type: String,
      // select: false,
    },
    // isEditedSinceFeedback: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  { timestamps: true },
);

// Methods for plain text password
userSchema.methods.isPasswordCorrect = function (password) {
  return password === this.password;
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      userId: this.userId,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY },
  );
};

// Create model AFTER adding methods
const User = mongoose.model("User", userSchema);

export default User;
