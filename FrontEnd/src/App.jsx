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
    {
      path: "",
      element: <MainLayout />,
      // FIXED: Must be lowercase "children"
      children: [
        { path: "", element: <Navigate to="/courses" replace /> },
        { path: "check-page", element: <CheckPage /> },
        { path: "courses", element: <CoursePage /> },
        { path: "course/:id", element: <CourseDetailsPage /> },
        { path: "login", element: <LoginPage /> },
        {
          path: ":userId/courses",
          element: (
            <RoleProtectedRoute allowedRoles={["contributor", "moderator", "admin"]}>
              <ContributorCoursePage />
            </RoleProtectedRoute>
          ),
        },
        {
          path: "course/edit/:id",
          element: (
            <CourseProvider>
              <RoleProtectedRoute allowedRoles={["contributor", "moderator", "admin"]}>
                <CourseDetailsEditPage />
              </RoleProtectedRoute>
            </CourseProvider>
          ),
        },
        {
          path: "course/:id",
          element: (
            <RoleProtectedRoute allowedRoles={["contributor", "moderator", "admin"]}>
              <CourseDetailsPage />
            </RoleProtectedRoute>
          ),
        },
        {
          path: "edit/:id",
          element: (
            <CourseProvider>
              <CourseDetailsEditPage />
            </CourseProvider>
          ),
        },
        {
          path: "add-course",
          element: (
            <RoleProtectedRoute allowedRoles={["contributor", "moderator", "admin"]}>
              <AddCoursePage />
            </RoleProtectedRoute>
          ),
        },
        { path: "admin", element: <AdminPage /> },
        {
          path: "all",
          element: (
            <RoleProtectedRoute allowedRoles={["moderator", "admin"]}>
              <AllCoursePage />
            </RoleProtectedRoute>
          ),
        },
        { path: "contributors", element: <AllContributorPage /> },
        { path: "moderators", element: <AllModeratorPage /> },
        { path: "moderators/:moderatorUserId", element: <ModeratorPage /> },
        { path: "*", element: <NotFoundSection /> },
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;  