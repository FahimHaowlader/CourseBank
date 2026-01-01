// src/index.js
import app from "./app.js";
import router from "./route.js"; // your existing routes

// Mount all routes under /api/v1
app.use("/api/v1", router);

export default app;
