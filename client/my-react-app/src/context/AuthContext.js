import { createContext, useContext, useState, useEffect } from "react";
import {
  login_user_service,
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
      if (result.data.status === 200) {
        setAuthUser(result.data.user);
        return result.data.user;
      }
    } catch (error) {
      console.log("error--in AuthProvider--", error);
      throw error;
    }
  };

  const checkAuthUser = async () => {
    try {
      const result = await checkAuth_user_service();
      if (result.data.status === 200) {
        setAuthUser(result.data.user);
        return result.data.user;
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

  const logoutUser = async () => {
    try {
      const result = await logout_user_service();
      if (result.data.status === 200) {
        setAuthUser({});
        setTrigger(!trigger);
        return result.data;
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

  

  const values = { authUser, loginUser, logoutUser, sara, setTrigger, trigger };
  return (
    <AuthContext.Provider value={values}>{props.children}</AuthContext.Provider>
  );
};
const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuthContext };

// 1) duhet te kemi nje objekt global i cili do te mbaje brenda vetes funksione dhe variable,te cilat do te shperndahen tek te gjithe komponentet
// 2) si fillim krijojme objektin global me: createContext({}); dhe shohim qe kemi kaluar nje parameter si objekt {}
// 3) AuthContext.Provider eshte momenti ku ne jemi duke permbledhur te gjitha variablat,state,function dhe i shperndan tek komponentet
// 4) {props.children} jane te gjithe komponentet qe do permbaje AuthProvider ne momentin qe do mbeshtjelle rutet
// 5) qe te perdorim Contekstin e krijuar duhet qe tja japim si parameter useContext dhe ne kete moment ai eshte i disponueshme te importohet brenda
