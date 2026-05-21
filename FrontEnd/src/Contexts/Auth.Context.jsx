import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import PrivateApi from "../Hooks/PrivateApi";

const AuthContext = createContext(null);

// Custom hook for easy context access
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Prevents premature redirects on page load
  const [error, setError] = useState(null);

  const API_BASE_URL = 'https://coursebank.onrender.com/api/v1';
  // const API_BASE_URL = 'http://localhost:5100/api/v1';

  // 1. HELPER TO SYNC SESSION ON REFRESH
  useEffect(() => {
    const syncSession = async () => {
      try {
        setLoading(true);
        // Using relative path so PrivateApi does not duplicate the baseURL
        const response = await PrivateApi.get("/refresh", { 
          withCredentials: true 
        }); 

        if (response.data?.data?.user) {
          setUser(response.data.data.user);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false); 
      }
    };

    syncSession();
  }, []); // Empty array ensures this runs exactly ONCE per page reload

  // 2. HELPER TO MANUALLY RE-FETCH USER PROFILE DATA
  const refreshUser = async () => {
    try {
      setLoading(true);
      console.log("Refreshing user data...");
      const response = await PrivateApi.get("/refresh", { withCredentials: true });
      setUser(response.data.data.user); 
      return response.data.user;
    } catch (error) {
      console.error("Failed to sync user data", error);
    }
      finally {
        setLoading(false);
      }
  };

  // 3. TRACK LOCATION HISTORY WITHOUT REACT-ROUTER HOOKS
  useEffect(() => {
    // Safely pull the active route directly from the browser window object
    const currentPath = window.location.pathname;

    // Ignore the login and signup paths so they aren't stored as redirect points
    if (currentPath !== "/login" && currentPath !== "/signup") {
      sessionStorage.setItem("prevPath", currentPath);
    }
  }, [user]); // Fires dynamically whenever the active login state updates

  // 4. USER LOGIN HANDLER
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
      throw err; 
    }
  };

  // 5. USER LOGOUT HANDLER
  const logOut = async () => {
    try {
      await axios.post(`${API_BASE_URL}/logout`, {}, { withCredentials: true });
      setUser(null);
      window.location.href = "/"; // Force window redirect to clear any residual memory states
    } catch (err) {
      // console.error("Logout failed", err);
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
    refreshUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};
