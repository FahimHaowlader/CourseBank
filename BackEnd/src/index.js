import app from "./app.js";
import router from "./route.js"; // your route.js with /api/v1 endpoints

// Mount all routes under /api/v1
app.use("/api/v1", router);

export default app;
