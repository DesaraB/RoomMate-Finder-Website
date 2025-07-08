import { createContext, useContext, useState, useEffect } from "react";
import {
  login_user_service,
  register_user_service,
  checkAuth_user_service,
  logout_user_service,
  sara_services,
} from "../Services/auth";

const AuthContext = createContext({});

const AuthProvider = (props) => {
  const [authUser, setAuthUser] = useState({});
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    checkAuthUser();
  }, [trigger]);

  const loginUser = async (data) => {
    try {
      const result = await login_user_service(data);
      if (result.status === 200) {
        setAuthUser(result.user);
        return result.user;
      }
    } catch (error) {
      console.log("error--in AuthProvider--", error);
      throw error;
    }
  };

  const registerUser = async (data) => {
    try {
      const result = await register_user_service(data);
      if (result.status === 200) {
        setAuthUser(result.user);
        return result.user;
      }
    } catch (error) {
      console.log("error--in AuthProvider--", error);
      throw error;
    }
  };

  const checkAuthUser = async () => {
    try {
      const result = await checkAuth_user_service();
      if (result.status === 200) {
        setAuthUser(result.user);
        return result.user;
      } else {
        setAuthUser({});
      }
      return result;
    } catch (error) {
      console.log("error----", error);
      setAuthUser({});
      return error;
    }
  };

  const refreshAuthUser = async () => {
    try {
      const result = await checkAuth_user_service();
      if (result.status === 200) {
        setAuthUser(result.user);
      }
    } catch (error) {
      console.log("Failed to refresh user", error);
    }
  };

  const logoutUser = async () => {
    try {
      const result = await logout_user_service();
      if (result.status === 200) {
        setAuthUser({});
        setTrigger(!trigger);
        return result;
      }
    } catch (error) {
      throw error;
    }
  };

  const sara = async () => {
    try {
      const result = await sara_services();
      if (result.status === 200) {
        return result;
      }
    } catch (error) {
      console.log("error");
    }
  };

  const values = {
    authUser,
    loginUser,
    registerUser,
    logoutUser,
    sara,
    setTrigger,
    trigger,
    refreshAuthUser,
  };

  return (
    <AuthContext.Provider value={values}>
      {props.children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuthContext };
