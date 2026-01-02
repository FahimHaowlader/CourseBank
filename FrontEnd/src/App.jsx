import './App.css'
//import elements for npm  packages
import { createBrowserRouter,RouterProvider,Navigate } from 'react-router'



// import pages
import CheckPage from './Pages/CheckPage.jsx'
import CoursePage from './Pages/CoursePage.jsx'
import CourseDetailsPage from './Pages/CourseDetailsPage.jsx'
import LoginPage from './Pages/LoginPage.jsx'
import ModeratorCoursePage from './Pages/ModeratorCoursePage.jsx'
import CourseDetailsEditPage from './Pages/CourseDetailsEditPage.jsx'
import AddCoursePage from './Pages/AddCoursePage.jsx'
import AdminPage from './Pages/AdminPage.jsx'
import AllCoursePage from './Pages/AllCoursePage.jsx'
import AllModeratorPage from './Pages/AllModeratorPage.jsx'



function App() {

  const router = createBrowserRouter([
    { path: '/', element: <Navigate to="/courses" replace /> },
    { path:'/check-page', element: <CheckPage /> },
    { path:'/courses', element: <CoursePage /> },
    { path:'/course-details', element: <CourseDetailsPage /> },
    { path:'/login', element: <LoginPage /> },
    { path:'/my-courses', element: <ModeratorCoursePage /> },
    { path:'/edit', element: <CourseDetailsEditPage /> },
    { path:'/add-course', element: <AddCoursePage /> },
    { path:'/admin', element: <AdminPage /> },
    { path:'/all', element: <AllCoursePage /> },
    { path:'/moderators', element: <AllModeratorPage /> },
  ])

  return (
    <div className="App" >
      <RouterProvider router={router} />
    </div>
  )
}
  

export default App
