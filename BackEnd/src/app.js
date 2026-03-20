import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import router from "./route.js";

const app = express();

// 1. SECURITY & CORS (Top Priority)
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

app.use(cors({
  origin: "http://localhost:5173", // EXACT frontend URL
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// 2. PARSERS (Before Routes)
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cookieParser()); // REQUIRED for req.cookies

// 3. STATIC FILES
app.use(express.static('public'));

// 4. ROUTES (Must be BEFORE the Error Handler)
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/v1', router);

// 5. GLOBAL ERROR HANDLER (MUST BE LAST)
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    console.error(`[ERROR] ${statusCode} - ${message}`);

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errors: err.errors || []
    });
});

export default app;