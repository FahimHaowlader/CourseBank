import React from 'react';
import { Outlet } from 'react-router';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import { useAuth } from '../Contexts/Auth.Context';

const MainLayout = () => {
  const { user } = useAuth();
console.log("MainLayout Rendered - User:", user); // Debugging line to check user state
  // Optional: Show a loading state while checking auth
  
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-main dark:text-white">
      {/* <Navbar /> */}
      
      {/* Main Container */}
      <main className="pt-2">
        {/* Dynamic Breadcrumbs Track */}
        {user &&  <Breadcrumbs /> }
        
        {/* Dynamic Page Routing content */}
        <Outlet />
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;