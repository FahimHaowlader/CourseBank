import app from "./app.js";
import router from "./route.js"; // your route.js with /api/v1 endpoints

let cached = global.mongo;
if (!cached) cached = global.mongo = { conn: null, promise: null };

app.use(async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      await connectDB();
      console.log("✅ MongoDB connected (serverless).");
    }
    next();
  } catch (err) {
    next(err);
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port " + (process.env.PORT || 3000));
});
export default app;
