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
          <footer className="bg-background-light dark:bg-card-dark border-t border-border-light dark:border-border-dark py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-text-secondary dark:text-gray-500">
          <p> University Course Bank System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;