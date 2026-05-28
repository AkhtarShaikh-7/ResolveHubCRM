import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import API from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({
  children,
}) => {

  const [admin, setAdmin] = useState(null);

  const [authLoading, setAuthLoading] =
    useState(true);



  // CHECK AUTH
  const checkAuth = async () => {
    try {

      const { data } = await API.get(
        "/auth/me"
      );

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




  // LOGOUT
  const logout = async () => {
    try {

      await API.post("/auth/logout");

      setAdmin(null);

    } catch (error) {
      console.log(error);
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



export const useAuth = () =>
  useContext(AuthContext);