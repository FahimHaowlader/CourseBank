import { Router } from "express";
import {
  userCourseSearch,
  fullCourseDetails,
  getCourseByCreatorId,
  createCourse,
  updateCourseInfo,
  uploadImage,
  uploadFile,
  deleteFile,
  updateCourseMaterials,
  updateCourseTasks,
  updateCourseAssessments,
  updateSuggestedBooks,
  updateCourseHandbook,
  deleteCourseHandbook,
  deleteCourse
} from "../controllers/course.controller.js";

import {
  createUser,
  updateUserInfo,
  userLogin,
  deleteUser,
  getAllUserSearch
} from "../controllers/user.controller.js";

import verifyJwt from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = Router();

// -------------------- Public Routes --------------------
router.get("/", (req, res) => res.send("API v1 is running"));

router.post("/login", async (req, res, next) => {
  try {
    await userLogin(req, res);
  } catch (err) {
    next(err);
  }
});

router.post("/upload/image", verifyJwt, upload.single("image"), async (req, res, next) => {
  try {
    await uploadImage(req, res);
  } catch (err) {
    next(err);
  }
});

router.post("/upload/file", verifyJwt, upload.single("file"), async (req, res, next) => {
  try {
    await uploadFile(req, res);
  } catch (err) {
    next(err);
  }
});

router.delete("/delete/file", verifyJwt, async (req, res, next) => {
  try {
    await deleteFile(req, res);
  } catch (err) {
    next(err);
  }
});

router.post("/users-all-course", async (req, res, next) => {
  try {
    await userCourseSearch(req, res);
  } catch (err) {
    next(err);
  }
});

router.get("/course-details/:courseId", async (req, res, next) => {
  try {
    await fullCourseDetails(req, res);
  } catch (err) {
    next(err);
  }
});

// -------------------- Protected Routes (Moderators) --------------------
router.use(verifyJwt);

router.get("/courses-by-creator/:creatorId", async (req, res, next) => {
  try {
    await getCourseByCreatorId(req, res);
  } catch (err) {
    next(err);
  }
});

router.post("/create-course", async (req, res, next) => {
  try {
    await createCourse(req, res);
  } catch (err) {
    next(err);
  }
});

router.patch("/update-course-info/:courseId", async (req, res, next) => {
  try {
    await updateCourseInfo(req, res);
  } catch (err) {
    next(err);
  }
});

router.patch("/update-course-materials/:courseId", async (req, res, next) => {
  try {
    await updateCourseMaterials(req, res);
  } catch (err) {
    next(err);
  }
});

router.patch("/update-course-tasks/:courseId", async (req, res, next) => {
  try {
    await updateCourseTasks(req, res);
  } catch (err) {
    next(err);
  }
});

router.patch("/update-course-assessments/:courseId", async (req, res, next) => {
  try {
    await updateCourseAssessments(req, res);
  } catch (err) {
    next(err);
  }
});

router.patch("/update-suggested-books/:courseId", async (req, res, next) => {
  try {
    await updateSuggestedBooks(req, res);
  } catch (err) {
    next(err);
  }
});

router.patch("/update-course-handbook/:courseId", async (req, res, next) => {
  try {
    await updateCourseHandbook(req, res);
  } catch (err) {
    next(err);
  }
});

router.delete("/delete-course-handbook/:courseId", async (req, res, next) => {
  try {
    await deleteCourseHandbook(req, res);
  } catch (err) {
    next(err);
  }
});

router.delete("/delete-course/:courseId", async (req, res, next) => {
  try {
    await deleteCourse(req, res);
  } catch (err) {
    next(err);
  }
});

// -------------------- Admin Routes --------------------
router.post("/create-user", async (req, res, next) => {
  try {
    await createUser(req, res);
  } catch (err) {
    next(err);
  }
});

router.patch("/update-user-info/:userId", async (req, res, next) => {
  try {
    await updateUserInfo(req, res);
  } catch (err) {
    next(err);
  }
});

router.delete("/delete-user/:userId", async (req, res, next) => {
  try {
    await deleteUser(req, res);
  } catch (err) {
    next(err);
  }
});

router.get("/search-users", async (req, res, next) => {
  try {
    await getAllUserSearch(req, res);
  } catch (err) {
    next(err);
  }
});

export default router;
