import { Router } from "express";
import { userCourseSearch,fullCourseDetailsForEdit, fullCourseDetails,getCourseByCreatorId, createCourse, updateCourseInfo, uploadImage, uploadFile, deleteFile, updateCourseMaterials, updateCourseTasks, updateCourseAssessments, updateSuggestedBooks, updateCourseHandbook, deleteCourseHandbook, deleteCourse , addNewMaterial, deleteMaterial, addNewTask, deleteTask, addNewAssessment, deleteAssessment, addNewSuggestedBook, deleteSuggestedBook,updateBasicInfo,
updateDescription,updateInstructorInfo,updateStartingDate, submitCourseForReview,administrativeCourseSearch, cancelCourseSubmission, acceptSubmission } from "./controllers/course.controller.js";


import {
  createContributors,
  createModerators,
  updateUserInfo,
  userLogin,
  deleteContributor,
  deleteModerator,
  getAllContributors,
  getModeratorByUserId,
  getAllModerators,
  handleRefresh,
  requestForSubmitContributorsAccount,
  cancelContributorAccountSubmission,
  approveContributorAccountSubmission,
  requestForSubmitModeratorsAccount,
  cancelModeratorAccountSubmission,
  approveModeratorAccountSubmission,
  LogOut
} from "./controllers/user.controller.js";

import  verifyJwt from "./middlewares/auth.middleware.js";
import {upload} from "./middlewares/multer.middleware.js";

// Course Bank  version 1 apies

const router = Router();


// ----- define your routes here ----

router.route('/').get((req, res) => res.send('Api verson 1 is running'));   


{/** helper route */}
router.route('/login').post(userLogin);

router.route('/refresh').get(verifyJwt, handleRefresh); // New route for token refresh and user info retrieval

router.route('/upload/image').post(verifyJwt, upload.single('image') , uploadImage);

router.route('/upload/file').post(verifyJwt, upload.single('file') , uploadFile);

router.route('/delete/file').delete(verifyJwt, deleteFile);

router.route('/logout').post(verifyJwt, LogOut);

{/** users route */} 

router.route('/users-all-course').post(userCourseSearch);
router.route('/course-details/:courseId').get(fullCourseDetails);


{/** contributors route */} 

router.use(verifyJwt) ; // all routes below this line require authentication

router.route('/administrative-course-search').post(administrativeCourseSearch);

// router.route('/co').post(userCourseSearch2);

router.route('/courses-by-creator/:userId').get(getCourseByCreatorId);

router.route('/course-details-for-edit/:courseId').get(fullCourseDetailsForEdit);

router.route('/create-course').post(createCourse);

// router.route('/update-course-info/:courseId').patch(updateCourseInfo);

router.route('/update-basic-info/:courseId').patch(updateBasicInfo);

router.route('/update-description/:courseId').patch(updateDescription);

router.route('/update-instructor-info/:courseId').patch(updateInstructorInfo);

router.route('/update-starting-date/:courseId').patch(updateStartingDate);

// router.route('/update-course-materials/:courseId').patch(updateCourseMaterials);

router.route('/add-new-material/:courseId').patch(addNewMaterial);

router.route('/delete-material/:courseId').patch(deleteMaterial);

// router.route('/update-course-tasks/:courseId').patch(updateCourseTasks);

router.route('/add-new-task/:courseId').patch(addNewTask);

router.route('/delete-task/:courseId').patch(deleteTask);

// router.route('/update-course-assessments/:courseId').patch(updateCourseAssessments);

router.route('/add-new-assessment/:courseId').patch(addNewAssessment);

router.route('/delete-assessment/:courseId').patch(deleteAssessment);

// router.route('/update-suggested-books/:courseId').patch(updateSuggestedBooks);

router.route('/add-new-suggested-book/:courseId').patch(addNewSuggestedBook);

router.route('/delete-suggested-book/:courseId').patch(deleteSuggestedBook);

router.route('/update-course-handbook/:courseId').patch(updateCourseHandbook);

// router.route('/delete-course-handbook/:courseId').delete(deleteCourseHandbook);

router.route('/submit-course-for-review/:courseId').post(submitCourseForReview);

router.route('/cancel-course-submission/:courseId').post(cancelCourseSubmission);

router.route('/accept-course-submission/:courseId').post(acceptSubmission);

router.route('/delete-course/:courseId').delete(deleteCourse);



{/** admin route */} 

// router.route('/create-user').post(createUser);

router.route('/create-contributor-account').post(createContributors);   

router.route('/create-moderator-account').post(createModerators);

router.route('/delete-contributor-account/:contributorUserId').delete(deleteContributor);

router.route('/delete-moderator-account/:moderatorUserId').delete(deleteModerator);

router.route('/get-all-contributors').post(getAllContributors);

router.route('/get-all-moderators').post(getAllModerators);

router.route('/get-moderator-by-userId/:moderatorUserId').get(getModeratorByUserId);

router.route('/update-user-info/:userId').patch(updateUserInfo);

router.route('/request-submit-contributor-account').post(requestForSubmitContributorsAccount);

router.route('/cancel-contributor-account-submission').post(cancelContributorAccountSubmission);

router.route('/approve-contributor-account-submission').post(approveContributorAccountSubmission);

router.route('/request-submit-moderator-account').post(requestForSubmitModeratorsAccount);

router.route('/cancel-moderator-account-submission').post(cancelModeratorAccountSubmission);

router.route('/approve-moderator-account-submission').post(approveModeratorAccountSubmission);

// router.route('/delete-user/:userId').delete(deleteUser);

// router.route('/search-users').post( getAllUserSearch);

// router.route('/submit-account').post(requestForSubmitAccount);

// router.route('/cancel-account-submission').post(cancelAccountSubmission);





export default router;


// when we will improve the Course Bank api then we can use this

// Course Bank version 2 apies

// const router = Router();
// ----- define your routes here ----

//  router.get('/', (req, res) => res.send('api verson 2 is running'));



// export {router} ;