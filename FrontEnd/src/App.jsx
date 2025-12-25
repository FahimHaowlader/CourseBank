import './App.css'
//import elements for npm  packages
import { createBrowserRouter,RouterProvider,Navigate } from 'react-router'



// import pages
import CheckPage from './Pages/CheckPage.jsx'
import CoursePage from './Pages/CoursePage.jsx'
import CourseDetailsPage from './Pages/CourseDetailsPage.jsx'


function App() {

  const router = createBrowserRouter([
    { path: '/', element: <Navigate to="/courses" replace /> },
    {path:'/check-page', element: <CheckPage />},
    {path:'/courses', element: <CoursePage />},
    {path:'/courseid', element: <CourseDetailsPage />},
  ])

  return (
    <div className="App" >
      <RouterProvider router={router} />
    </div>
  )
}
  

export default App
