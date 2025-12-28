import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import route from "./route.js";


const app = express();

app.use(helmet()); // Add helmet for security headers

const allowedOrigins = [
  process.env.CLIENT_URL_PROD,  // production domain
  process.env.CLIENT_URL_DEV,  // local development
];


app.use(cors()); // Enable CORS for all origins


// app.use(cors({
//     origin: function(origin, callback) {
//         // allow requests with no origin (like mobile apps or curl)
//         if (!origin) return callback(null, true);
//         if (allowedOrigins.indexOf(origin) === -1) {
//             const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
//             return callback(new Error(msg), false);
//         }
//         return callback(null, true);
//     },
//     credentials: true,
//     optionsSuccessStatus: 200 // for legacy browsers
// }));


app.use(express.json({ limit: '1mb' })); // Parse JSON request bodies

app.use(express.urlencoded({ extended: true, limit: '1mb' })); // Parse URL-encoded request bodies

app.use(express.static('public')); // Serve static files from the 'public' directory
app.use(cookieParser()); // Parse cookies in request headers


app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/v1', route); // Use the imported route for /api/v1

export default app;