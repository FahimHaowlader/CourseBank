import { createContext, useContext, useState, useEffect } from "react";

import axios from "axios";


const context = createContext();
export const useAuth = () => useContext(context);

export const AuthContext = ({children}) => {
 const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
//   const [adminLoading, setAdminLoading] = useState(true);



  useEffect(() => {
    const userStatus = onAuthStateChanged(auth, (user) => {
      if (user) {
         setUser(user);
        setLoading(false);
      }
    });
      return () => userStatus();
  }, []);
  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    adminLoading,
   
    createEmailUser,
    emailUserSignIn,
    userInfoUpdate,
    googleUser,
    userSignOut,
  };
   return (<context.Provider value={authInfo}>
    {children}
    </context.Provider>)
}

export default AuthContext