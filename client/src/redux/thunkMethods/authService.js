import axios from "axios";

// Register Thunk Method
const register = async (userData) => {
  const { data } = await axios.post(
    "http://localhost:8000/api/v1/user/register",
    userData
  );

  return data;
};

// Login Thunk Method
const login = async (userData) => {
  const { data } = await axios.post(
    "http://localhost:8000/api/v1/user/login",
    userData
  );

  if (data?.user) {
    localStorage.setItem("user", JSON.stringify(data.user));
  }

  return data;
};

// Logout Thunk Method
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
