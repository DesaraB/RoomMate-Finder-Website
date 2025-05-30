import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext({});
const AuthProvider = (props) => {
  const [authUser, setAuthUser] = useState({ name: "" });

  const values = { authUser };

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