import React from 'react';
import { Link, useLocation } from 'react-router';
import { MdHome, MdDashboard, MdLogout } from 'react-icons/md';
import { useAuth } from '../Contexts/Auth.Context';

const Breadcrumbs = () => {
  const location = useLocation();
  const { user,logOut } = useAuth();

  // Prevents the bar from showing if you're already on the home page
  if (location.pathname === '/') {
    return null;
  }

  // Placeholder function for handleLogout - replace this with your actual auth logic
  const handleLogout = () => {
   logOut(); // Call the logout function from your auth context or service
    // e.g., signOut(), localStorage.clear(), etc.
  };

  const path = user.role === "admin" ? "/admin" : user.role === "contributor" ? 'contributors/' + user.userId +"/courses": "moderators/" + user.userId;
console.log("Breadcrumbs Rendered - User:", user, "Path:", path); // Debugging line to check user state and path
  return (
    <nav 
      aria-label="breadcrumb" 
      className="bg-card-light sticky top-1 z-50 dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-2 px-5 my-2  mx-4 sm:mx-6 lg:mx-8 "
    >
      {/* justify-between pushes Home to the left and the Action Group to the right */}
      <div className="flex items-center justify-between text-sm font-semibold">
        
        {/* Left Side: Home Link */}
        <div>
          <Link 
            to="/" 
            className="flex items-center gap-1 text-text-secondary dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-200"
          >
            {/* <MdHome className="text-[18px]" /> */}
            <span>Home</span>
          </Link>
        </div>

        {/* Right Side: Dashboard & Logout Action Group */}
        <div className="flex items-center gap-4">
          {/* Dashboard Link */}
          <Link
            to={`${path}`}
            className="flex items-center gap-1 text-text-secondary dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-200"
          >
            <MdDashboard className="text-[16px]" />
            {/* <span>Dashboard</span> */}
          </Link>

          {/* Vertical Divider Line */}
          <span className="h-4 w-[1px] bg-border-light dark:bg-border-dark" />

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-text-secondary dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200 cursor-pointer"
          >
            <MdLogout className="text-[16px]" />
            {/* <span>Logout</span> */}
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Breadcrumbs;