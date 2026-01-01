import mongoose from "mongoose";

let cached = global.mongo;
if (!cached) cached = global.mongo = { conn: null, promise: null };

const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}/${process.env.DATABASE_NAME}?retryWrites=true&w=majority&appName=Cluster0`;
    cached.promise = mongoose
      .connect(uri)
      .then((conn) => {
        cached.conn = conn;
        console.log(`✅ MongoDB connected: ${conn.connection.host}`);
        return conn;
      })
      .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
        throw err; // Do NOT exit process in serverless
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDB;
