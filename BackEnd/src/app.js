import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import router from "./route.js";


const app = express();

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

const allowedOrigins = [
  process.env.CLIENT_URL_PROD,
  process.env.CLIENT_URL_DEV,
  "http://localhost:5173" // Hardcode this temporarily to test
].filter(Boolean); // This removes any 'undefined' values from the array

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS. Origin was:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}));


app.use(express.json({ limit: '1mb' })); // Parse JSON request bodies

app.use(express.urlencoded({ extended: true, limit: '1mb' })); // Parse URL-encoded request bodies

app.use(express.static('public')); // Serve static files from the 'public' directory
app.use(cookieParser()); // Parse cookies in request headers


app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/v1', router); // Use the imported route for /api/v1

export default app;