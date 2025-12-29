import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    uppercase: true,
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
  },
  year: {
    type: Number,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  degree: {
    type: String,
    required: true,
    lowercase: true,
    enum: ["bachelors", "masters", "phd"],
  },
  email: {
    type: String,
    // required: true, {/* temporarily disabled for testing */}
  },
  password: {
    type: String,
    required: true,
    lowercase: true,
    select: false, // plain text password is not selectable
  },
  role: {
    type: String,
    enum: ["moderator", "instructor", "admin"],
    default: "moderator",
  },
}, { timestamps: true });

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
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

// Create model AFTER adding methods
const User = mongoose.model("User", userSchema);

export default User;
