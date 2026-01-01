import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import router from "./route.js"; // your route.js with /api/v1 endpoints
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// -------------------- Security --------------------
app.use(helmet());

// -------------------- CORS --------------------
const allowedOrigins = [
  process.env.CLIENT_URL_PROD,
  process.env.CLIENT_URL_DEV,
];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.indexOf(origin) === -1) {
//         return callback(new Error(`CORS blocked for origin: ${origin}`), false);
//       }
//       return callback(null, true);
//     },
//     credentials: true,
//     optionsSuccessStatus: 200,
//   })
// );

// -------------------- Body Parsing --------------------

app.use(cors())
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// -------------------- Static Files --------------------
app.use("/public", express.static(path.join(__dirname, "public")));

// -------------------- Cookies --------------------
app.use(cookieParser());

// -------------------- Health Check --------------------
app.get("/", (req, res) => res.send("API is running..."));

// Mount all routes under /api/v1
app.use("/api/v1", router);



// -------------------- Global Error Handler --------------------
app.use((err, req, res, next) => {
  console.error("❌ Serverless error:", err);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message || "Something went wrong",
  });
});

export default app;
