import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// 1. Create the context
const AuthContext = createContext(null);

// 2. Export the hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// 3. Export the Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'https://coursebank.onrender.com/api/v1';
  // axios.defaults.withCredentials = true;

  useEffect(() => {
    // const checkSession = async () => {
    //   try {
    //     const response = await axios.get(`${API_BASE_URL}/me`);
    //     if (response.data) setUser(response.data);
    //   } catch (err) {
    //     setUser(null);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // checkSession();
  }, []);

  const loginWithUserIdAndPassword = async (userId, password) => {
    console.log("Attempting login for:", userId);
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { userId, password });
      setUser(response.data.user);
      setLoading(false);
      return response.data.user;
    } catch (err) {
      setLoading(false);
      const msg = err.response?.data?.message || "Login failed";
      setError(msg);
      throw err;
    }
  };

  const logOut = async () => {
    try {
      await axios.post(`${API_BASE_URL}/logout`);
      setUser(null);
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
    
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

// Use Named Exports for everything to keep Vite happy