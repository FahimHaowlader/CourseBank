import mongoose from "mongoose";
import jwt from "jsonwebtoken"; 
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    Access: {
        type: Boolean,
        required: true,
    },
    email: {
        type: String,
        // required: true,    {/* temporarily disabled for testing */}
        },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['moderator', 'instructor', 'admin'],
        default: 'moderator',
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

userSchema.pre("save",async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, 12);
    next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      studentId: this.studentId,
      accountType: this.accountType,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

 



export default User;