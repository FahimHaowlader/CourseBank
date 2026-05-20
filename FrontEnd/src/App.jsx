import "./App.css";
// Import elements from npm packages
import { createBrowserRouter, RouterProvider, Navigate } from "react-router";

// Import components
import RoleProtectedRoute from "./MiddleWare/RoleProtectedRoute.jsx";

// Import context
import { CourseProvider } from "./Contexts/Course.Context.jsx";

// Import pages
import CheckPage from "./Pages/CheckPage.jsx";
import CoursePage from "./Pages/CoursePage.jsx";
import CourseDetailsPage from "./Pages/CourseDetailsPage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import ContributorCoursePage from "./Pages/ContributorCoursePage.jsx";
import CourseDetailsEditPage from "./Pages/CourseDetailsEditPage.jsx";
import AddCoursePage from "./Pages/AddCoursePage.jsx";
import AdminPage from "./Pages/AdminPage.jsx";
import AllCoursePage from "./Pages/AllCoursePage.jsx";
import AllContributorPage from "./Pages/AllContributorPage.jsx";
import AllModeratorPage from "./Pages/AllModeratorPage.jsx";
import ModeratorPage from "./Pages/ModeratorPage.jsx";
import NotFoundSection from "./Components/NotFoundSection.jsx";
import MainLayout from "./Layouts/MainLayout.jsx";

function App() {
  const router = createBrowserRouter([
    { path: "login", element: <LoginPage /> },
    {
      path: "",
      element: <MainLayout />,
      // FIXED: Must be lowercase "children"
      children: [
        { path: "", element: <Navigate to="/courses" replace /> },
        { path: "check-page", element: <CheckPage /> },
        { path: "courses", element: <CoursePage /> },
        { path: "courses/:id", element: <CourseDetailsPage /> },
       

        // contributor routes
        {
          path: "contributors/:contributorUserId/courses",
          element: (
            <RoleProtectedRoute
              allowedRoles={["contributor", "moderator", "admin"]}
            >
              <ContributorCoursePage />
            </RoleProtectedRoute>
          ),
        },
        {
          path: "contributors/:contributorUserId/courses/:id",
          element: (
            <RoleProtectedRoute
              allowedRoles={["contributor", "moderator", "admin"]}
            >
              <CourseDetailsPage />
            </RoleProtectedRoute>
          ),
        },
        {
          path: "contributors/:contributorUserId/courses/edit/:id",
          element: (
            <CourseProvider>
              <RoleProtectedRoute
                allowedRoles={["contributor", "moderator", "admin"]}
              >
                <CourseDetailsEditPage />
              </RoleProtectedRoute>
            </CourseProvider>
          ),
        },
        {
          path: "contributors/:contributorUserId/courses/add",
          element: (
            <RoleProtectedRoute
              allowedRoles={["contributor", "moderator", "admin"]}
            >
              <AddCoursePage />
            </RoleProtectedRoute>
          ),
        },

        // moderator routes

        {
          path: "moderators/:moderatorUserId",
          element: (
            <RoleProtectedRoute
              allowedRoles={["moderator", "admin"]}
            >
              <ModeratorPage />
            </RoleProtectedRoute>
          ),
        },
        {
          path: "moderators/:moderatorUserId/courses/:id",
          element: (
            <RoleProtectedRoute
              allowedRoles={["moderator", "admin"]}
            >
              <CourseDetailsPage />
            </RoleProtectedRoute>
          ),
        },
        {
          path: "moderators/:moderatorUserId/courses/edit/:id",
          element: (
            <CourseProvider>
              <RoleProtectedRoute
                allowedRoles={["moderator", "admin"]}
              >
                <CourseDetailsEditPage />
              </RoleProtectedRoute>
            </CourseProvider>
          ),
        },
        {
          path: "moderators/:moderatorUserId/courses/add",
          element: (
            <RoleProtectedRoute
              allowedRoles={["moderator", "admin"]}
            >
              <AddCoursePage />
            </RoleProtectedRoute>
          ), 
        },
        {
          path: "moderators/:moderatorUserId/courses",
          element: (
            <RoleProtectedRoute
              allowedRoles={["moderator", "admin"]}
            >
              <AllCoursePage />
            </RoleProtectedRoute>
          ),
        },
        {
          path: "moderators/:moderatorUserId/courses/review/:id",
          element: (
            <CourseProvider>
            <RoleProtectedRoute
              allowedRoles={["moderator", "admin"]}
            >
              <CourseDetailsEditPage />
            </RoleProtectedRoute>
            </CourseProvider>
          ),
        },
        {
          path: "moderators/:moderatorUserId/contributors",
          element: (
            <RoleProtectedRoute
              allowedRoles={["moderator", "admin"]}
            >
              <AllContributorPage />
            </RoleProtectedRoute>
          ),
        },
        {
          path: "moderators/:moderatorUserId/contributors/:contributorUserId/courses",
          element: (
            <RoleProtectedRoute
              allowedRoles={["moderator", "admin"]}
            >
              <ContributorCoursePage />
            </RoleProtectedRoute>
          ),
        },
        {
          path: "moderators/:moderatorUserId/contributors/:contributorUserId/courses/:id",
          element: (
            <RoleProtectedRoute
              allowedRoles={["moderator", "admin"]}
            >
              <CourseDetailsPage />
            </RoleProtectedRoute>
          ),
        },
        {
          path: "moderators/:moderatorUserId/contributors/:contributorUserId/courses/review/:id",
          element: (
            <CourseProvider>
            <RoleProtectedRoute
              allowedRoles={["moderator", "admin"]}
            >
              <CourseDetailsEditPage />
            </RoleProtectedRoute>
            </CourseProvider>
          ),
        },

        // admin routes

        {
          path: "admin",
          element: (
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <AdminPage />
            </RoleProtectedRoute>
          ),
        },
        
        {
          path: "admin/courses",
          element: (
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <AllCoursePage />
            </RoleProtectedRoute>
          ),
        },
        {
          path: "admin/courses/add",
          element: (
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <AddCoursePage />
            </RoleProtectedRoute>
          ),
        },
        {
          path: "admin/courses/:id",
          element: (
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <CourseDetailsPage />
            </RoleProtectedRoute>
          ),
        },
        {
          path: "admin/courses/edit/:id",
          element: (
            <CourseProvider>
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <CourseDetailsEditPage />
                </RoleProtectedRoute>
                </CourseProvider>
              ),
            },

              {
          path: "admin/contributors",
          element: (
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <AllContributorPage />
            </RoleProtectedRoute>
          ),
        },
              {
          path: "admin/contributors/:contributorUserId/courses",
          element: (
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <ContributorCoursePage />
            </RoleProtectedRoute>
          ),
        },
              {
          path: "admin/contributors/:contributorUserId/courses/:id",
          element: (
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <CourseDetailsPage />
            </RoleProtectedRoute>
          ),
        },
              {
          path: "admin/contributors/:contributorUserId/courses/edit/:id",
          element: (
            <CourseProvider>
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <CourseDetailsEditPage />
            </RoleProtectedRoute>
            </CourseProvider>
          ),
        },
           {
          path: "admin/moderators",
          element: (
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <AllModeratorPage />
            </RoleProtectedRoute>
          ),
        },
           {
          path: "admin/moderators/:moderatorUserId",
          element: (
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <ModeratorPage />
            </RoleProtectedRoute>
          ),
        },
           {
          path: "admin/moderators/:moderatorUserId/courses",
          element: (
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <AllCoursePage />
            </RoleProtectedRoute>
          ),
        },
           {
          path: "admin/moderators/:moderatorUserId/courses/:id",
          element: (
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <CourseDetailsPage />
            </RoleProtectedRoute>
          ),
        },
           {
          path: "admin/moderators/:moderatorUserId/courses/edit/:id",
          element: (
            <CourseProvider>
              <RoleProtectedRoute allowedRoles={["admin"]}>
                <CourseDetailsEditPage />
              </RoleProtectedRoute>
            </CourseProvider>
          ),
        },
        
        {
       path: "admin/moderators/:moderatorUserId/contributors",
       element: (
         <RoleProtectedRoute allowedRoles={["admin"]}>
           <AllContributorPage />
         </RoleProtectedRoute>
       ),
     },
        
        {
       path: "admin/moderators/:moderatorUserId/contributors/:contributorUserId/courses",
       element: (
         <RoleProtectedRoute allowedRoles={["admin"]}>
           <ContributorCoursePage />
         </RoleProtectedRoute>
       ),
     },
        
        {
       path: "admin/moderators/:moderatorUserId/contributors/:contributorUserId/courses/:id",
       element: (
         <RoleProtectedRoute allowedRoles={["admin"]}>
           <CourseDetailsPage />
         </RoleProtectedRoute>
       ),
     },
     {
       path: "admin/moderators/:moderatorUserId/contributors/:contributorUserId/courses/edit/:id",
       element: (
        <CourseProvider>
         <RoleProtectedRoute allowedRoles={["admin"]}>
           <CourseDetailsEditPage />
         </RoleProtectedRoute>
         </CourseProvider>  
       ),
     },
    ],
  },
  { path: "*", element: <NotFoundSection /> },
]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
