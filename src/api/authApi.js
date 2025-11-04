import API from "./api";

// Register new user
export const registerUser = async (userData) => {
  const { data } = await API.post("/auth/register", userData);
  return data;
};

// Login user
export const loginUser = async (userData) => {
  const { data } = await API.post("/auth/login", userData);
  return data;
};

// Get current user
export const getCurrentUser = async () => {
  const { data } = await API.get("/auth/me");
  return data;
};

// Search users
export const searchUsers = async (keyword) => {
  const { data } = await API.get(`/auth?search=${keyword}`);
  return data;
};
