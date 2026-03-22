import "./App.css";
//import elements for npm  packages
import { createBrowserRouter, RouterProvider, Navigate } from "react-router";

// import components
import RoleProtectedRoute from "./MiddleWare/RoleProtectedRoute.jsx";

// impoert context
import { CourseProvider } from "./Contexts/Course.Context.jsx";

// import pages
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

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Navigate to="/courses" replace /> },

    {
      path: "/check-page",
      element: (
        <RoleProtectedRoute allowedRoles={["user", "moderator", "admin"]}>
          <CheckPage />
        </RoleProtectedRoute>
      ),
    },

    { path: "/courses", element: <CoursePage /> },
    { path: "/course/:id", element: <CourseDetailsPage /> },
    { path: "/login", element: <LoginPage /> },
    { 
      path: "/my-courses", 
      element: <RoleProtectedRoute allowedRoles={["contributor", "moderator", "admin"]}>
      <ContributorCoursePage />
      </RoleProtectedRoute>
     },
     {
      path: "/my-course/edit/:id",
      element: (
        <CourseProvider>
        <RoleProtectedRoute allowedRoles={["contributor", "moderator", "admin"]}>
          <CourseDetailsEditPage />
        </RoleProtectedRoute>
        </CourseProvider>
      ),
     },
    {
      path: "/my-course/:id",
      element: (
        <RoleProtectedRoute allowedRoles={["contributor", "moderator", "admin"]}>
          <CourseDetailsPage />
        </RoleProtectedRoute>
      ),  
    },
    {
      path: "/edit/:id",
      element: (
        <CourseProvider>
          <CourseDetailsEditPage />
        </CourseProvider>
      ),
    },

    {
      path: "/add-course",
      element: (
        <RoleProtectedRoute allowedRoles={["user", "moderator", "admin"]}>
          <AddCoursePage />
        </RoleProtectedRoute>
      ),
    },

    { path: "/admin", element: <AdminPage /> },
    { path: "/all", element: <AllCoursePage /> },
    { path: "/contributors", element: <AllContributorPage /> },
    {
      path: "*",
      element: <h1 className="text-center text-3xl mt-20">404 Not Found</h1>,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
