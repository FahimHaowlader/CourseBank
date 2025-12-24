import './App.css'
//import elements for npm  packages
import { createBrowserRouter,RouterProvider,Navigate } from 'react-router'



// import pages
import CheckPage from './Pages/CheckPage.jsx'
import CoursePage from './Pages/CoursePage.jsx'
function App() {

// const handleThemeChange = (event) => {
//   const newTheme = event.target.checked ? "dark" : "light";
//   setTheme(newTheme);
//   localStorage.setItem("theme", newTheme);
// };

  const router = createBrowserRouter([
    { path: '/', element: <Navigate to="/courses" replace /> },
    {path:'/check-page', element: <CheckPage />},
    {path:'/courses', element: <CoursePage />},
  ])

  return (
    <div className="App" >
      <RouterProvider router={router} />
    </div>
  )
}
  

export default App
