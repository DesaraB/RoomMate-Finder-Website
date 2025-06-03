import axios from "axios";

const login_user_service = async (values) => {
  const result = await axios.post(
    "http://localhost:3001/api/users/login",
    values
  );
  return result;
};

const checkAuth_user_service = async () => {
  const result = await axios.get("http://localhost:3001/api/users/checkAuthUser");
  return result;
};

const logout_user_service = async () => {
	const result = await axios.post("http://localhost:3001/api/users/logout");
	return result;
}

const sara_services = async()=>{
	const result = await axios.get("http://localhost:3001/api/users/sara");
	return result;
}

export { login_user_service, checkAuth_user_service,logout_user_service , sara_services };