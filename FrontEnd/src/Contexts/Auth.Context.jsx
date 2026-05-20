import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useLocation ,useNavigate} from "react-router";
import PrivateApi from "../Hooks/PrivateApi";

// const navigate = useNavigate();
const AuthContext = createContext(null);
// 1. Custom hook for easy access
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Start as true to prevent premature redirects
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://localhost:5100/api/v1';

  // Helper to sync session on refresh
  useEffect(() => {
    const syncSession = async () => {
      try {
        setLoading(true);
        const response = await PrivateApi.get(`${API_BASE_URL}/refresh`, { 
          withCredentials: true 
        }); 

        if (response.data?.data?.user) {
          // This updates the 'user' state for the next render
          setUser(response.data.data.user);
          
        }
      } catch (err) {
        // console.error("Session sync failed:", err.message);
        setUser(null);
      } finally {
        // Stop loading only after we know if the user exists or not
        setLoading(false); 
      }
    };

    syncSession();
  }, []); // Empty array ensures this runs ONCE per page refresh

  // Inside your AuthProvider
const refreshUser = async () => {
  try {
    // 1. Call the API to get the LATEST user data from DB
    const response = await PrivateApi.get("/refresh",); // Ensure cookies are sent
    
    // 2. Update the React State with the fresh data
    setUser(response.data.data.user); 
    
    return response.data.user;
  } catch (error) {
    console.error("Failed to sync user data", error);
  }
};


useEffect(() => {
  // Ignore the login page so we don't save it as a "previous" destination
  if (location.pathname !== "/login" && location.pathname !== "/signup") {
    console.log("Saving full path:", location.pathname);
    sessionStorage.setItem("prevPath", location.pathname);
  }
}, [location]);

  const loginWithUserIdAndPassword = async (userId, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { userId, password }, { withCredentials: true });
      const userData = response.data?.data?.user;
      setUser(userData);
      setLoading(false);
      return userData;
    } catch (err) {
      setLoading(false);
      const msg = err.response?.data?.message || "Login failed";
      setError(msg);
      throw err; // Throw so the login page can handle local UI logic
    }
  };

  const logOut = async () => {
    try {
      await axios.post(`${API_BASE_URL}/logout`, {}, { withCredentials: true });
      setUser(null);
     window.location.href = "/";
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const authInfo = {
    user,
    loading,
    setLoading,
    loginWithUserIdAndPassword,
    logOut,
    error,
    setError,
    refreshUser, // Expose the refresh function to components that need it
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};