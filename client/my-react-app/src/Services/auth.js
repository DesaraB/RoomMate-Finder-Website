import axios from "axios";

// ✅ Login with debug
export const login_user_service = async ({ email, password }) => {
  try {
    console.log("📤 Sending login request with:", {
      email: email.toLowerCase(),
      password,
    });

    const response = await axios.post(
      "http://localhost:3001/api/users/login",
      { email: email.toLowerCase(), password },
      { withCredentials: true }
    );

    console.log("✅ Login response received:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Login failed:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Register
const register_user_service = async (values) => {
  const result = await axios.post(
    "http://localhost:3001/api/users/register",
    values,
    {
      withCredentials: true,
    }
  );
  return result.data;
};

// ✅ Check auth
const checkAuth_user_service = async () => {
  const result = await axios.get("http://localhost:3001/api/users/checkAuth", {
    withCredentials: true,
  });
  return result.data;
};

// ✅ Logout
const logout_user_service = async () => {
  const result = await axios.post(
    "http://localhost:3001/api/users/logout",
    {},
    {
      withCredentials: true,
    }
  );
  return result.data;
};

// ✅ Custom (optional)
const sara_services = async () => {
  const result = await axios.get("http://localhost:3001/api/users/sara", {
    withCredentials: true,
  });
  return result.data;
};

export {
  register_user_service,
  checkAuth_user_service,
  logout_user_service,
  sara_services,
};
