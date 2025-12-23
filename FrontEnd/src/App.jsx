import './App.css'

//import elements for npm  packages
import { createBrowserRouter,RouterProvider,Navigate } from 'react-router'


// import pages

import CheckPage from './Pages/CheckPage.jsx'



function App() {
  const router = createBrowserRouter([
    { path: '/', element: <Navigate to="/home" replace /> },
    {path:'/check-page', element: <CheckPage />},
  ])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}
  

export default App
