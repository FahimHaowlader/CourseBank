import './App.css'

// elements for npm  packages
import { createBrowserRouter,RouterProvider,Navigate } from 'react-router'

function App() {
  const router = createBrowserRouter([
    { path: '/', element: <Navigate to="/home" replace /> },
    {path:'/home', element: <div>Home Page</div>},
  ])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}
  

export default App
