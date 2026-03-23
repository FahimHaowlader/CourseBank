import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../Contexts/Auth.Context.jsx';

import AppleSpinner from '../Components/AppleSpinner.jsx';

const RoleProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth(); // Get user and loading state from context
    const location = useLocation();


 

    // 1. While the API is checking if the user is logged in, show a loader
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
              <AppleSpinner />  
            </div>
        );
    }

    // 2. If no user is found in the context, they aren't logged in
    if (!user) {
        console.log("No user found, redirecting to login...");
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // 3. Match Role: Check if the user's role is in the allowedRoles array
    // We assume 'user' object looks like: { role: 'admin', name: 'John' }
    const userRole = user.role; 
    const isAllowed = allowedRoles.includes(userRole);

    // console.log("Auth Check:", { 
    //     userRole, 
    //     allowedRoles, 
    //     accessGranted: isAllowed 
    // });

    if (!isAllowed) {
        // User is logged in but doesn't have permission for this specific route
        return <Navigate to="/" replace />;
    }

    // 4. Everything matches! Render the protected component
    return children;
};

export default RoleProtectedRoute;