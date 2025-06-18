import axios from "axios";

// ✅ Login with credentials
const login_user_service = async (values) => {
  console.log("Sending login request to backend...", values);
  const result = await axios.post(
    "http://localhost:3001/api/users/login",
    values,
    {
      withCredentials: true, // ✅ Send cookie
    }
  );
  return result;
};

// ✅ Check auth with credentials
const checkAuth_user_service = async () => {
  const result = await axios.get(
    "http://localhost:3001/api/users/checkAuth",
    {
      withCredentials: true, // ✅ Send cookie
    }
  );
  return result;
};

// ✅ Logout with credentials
const logout_user_service = async () => {
  const result = await axios.post(
    "http://localhost:3001/api/users/logout",
    {},
    {
      withCredentials: true, // ✅ Send cookie
    }
  );
  return result;
};

const sara_services = async () => {
  const result = await axios.get("http://localhost:3001/api/users/sara", {
    withCredentials: true, // just in case it's protected
  });
  return result;
};

export {
  login_user_service,
  checkAuth_user_service,
  logout_user_service,
  sara_services,
};
