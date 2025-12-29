import mongoose from "mongoose";
import jwt from "jsonwebtoken"; 
import bcrypt from "bcrypt";

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
        lowercase : true,
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
        // required: true,    {/* temporarily disabled for testing */}
        },
    password: {
        type: String,
        required: true,
        select: false,
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
      userId: this.userId,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

 



export default User;