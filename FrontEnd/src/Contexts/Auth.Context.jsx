import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import PrivateApi from "../Hooks/PrivateApi";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false); // 🛡️ Safety shield flag

  // Adjust this dynamically based on deployment environments
  const API_BASE_URL = 'https://coursebank.onrender.com/api/v1'
  // const API_BASE_URL = 'http://localhost:5100/api/v1'
    

  // 1. HELPER TO SYNC SESSION ON REFRESH
  useEffect(() => {
    const syncSession = async () => {
      try {
        setLoading(true);
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
  }, []); 

  // 2. HELPER TO MANUALLY RE-FETCH USER PROFILE DATA
  const refreshUser = async () => {
    if (isLoggingOut) return null; // Abort instantly if logging out
    try {
      setLoading(true);
      console.log("Refreshing user data...");
      const response = await PrivateApi.get("/refresh", { withCredentials: true });
      setUser(response.data.data.user); 
      return response.data.user;
    } catch (error) {
      console.error("Failed to sync user data", error);
    } finally {
      setLoading(false);
    }
  };

  // 3. TRACK LOCATION HISTORY WITHOUT REACT-ROUTER HOOKS
  useEffect(() => {
    // 🛡️ If logging out, freeze track parsing to prevent residual requests from firing
    if (isLoggingOut || !user) return;

    const currentPath = window.location.pathname;
    if (currentPath !== "/login" && currentPath !== "/signup") {
      sessionStorage.setItem("prevPath", currentPath);
    }
  }, [user, isLoggingOut]); 

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
      setIsLoggingOut(true); // 🛡️ Activate shield: prevents any re-fetching loops
      setLoading(true);

      // Call backend to clear cookies cleanly
      await axios.post(`${API_BASE_URL}/logout`, {}, { withCredentials: true });
      
      // Clear client state memory completely
      setUser(null);
      setError(null);
      
      // Redirect safely to public landing page
      window.location.replace("/"); 
    } catch (err) {
      console.error("Logout request error:", err);
      // Fallback fallback if network breaks down mid-flight
      setUser(null);
      window.location.replace("/");
    } finally {
      setIsLoggingOut(false);
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