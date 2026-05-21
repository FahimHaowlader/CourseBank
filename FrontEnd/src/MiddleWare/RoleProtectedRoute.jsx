import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../Contexts/Auth.Context.jsx';
import AppleSpinner from '../Components/AppleSpinner.jsx';

const RoleProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth(); 
    const location = useLocation();
    console.log(user)
    // 1. While the API is fetching backend credentials, keep the loader up
    if (loading) {
        console.log("Loading user data, showing spinner...");
        return (
            <div className="flex items-center justify-center h-screen bg-white dark:bg-black">
              <AppleSpinner/>  
            </div>
        );
    }

    // 2. If loading completes and no user object exists, redirect safely
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace/>;
    }

    // 3. Match Role permissions
    const userRole = user.role; 
    const isAllowed = allowedRoles.includes(userRole);

    if (!isAllowed) {
        // Logged in but unauthorized for this tier -> redirect to dashboard root
        return <Navigate to="/" replace/>;
    }

    return children;
};

export default RoleProtectedRoute;