import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import router from "./route.js";

const app = express();

// 1. HELMET - Configure to allow cross-origin
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// 2. CORS - Explicitly allow your frontend
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// 3. PARSERS - Must be before routes
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cookieParser()); // Moved up

// 4. STATIC FILES
app.use(express.static('public'));

// 5. ROUTES
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/v1', router);

export default app;