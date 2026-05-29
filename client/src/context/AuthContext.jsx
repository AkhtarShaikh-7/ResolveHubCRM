import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // CHECK AUTH
  const checkAuth = async () => {
    try {
      const { data } = await API.get("/auth/me", {
        withCredentials: true,
      });

      setAdmin(data.admin);
    } catch (error) {
      setAdmin(null);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // LOGOUT (FIXED)
  const logout = async () => {
    try {
      await API.post("/auth/logout", {}, {
        withCredentials: true,
      });

      // IMPORTANT: clear state immediately
      setAdmin(null);

      // OPTIONAL BUT BEST: recheck auth
      await checkAuth();

    } catch (error) {
      console.log(error);
      setAdmin(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        setAdmin,
        authLoading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);