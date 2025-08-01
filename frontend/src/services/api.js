import axios from "axios";

const API_URL = `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api`;

// ✅ Fetch donors (or adjust endpoint as needed)
export const fetchPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/donors`); // Change this endpoint to match your backend route
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching posts:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, userData);
    return response.data;
  } catch (error) {
    console.error("❌ Registration failed:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Login a user
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, userData);
    return response.data;
  } catch (error) {
    console.error("❌ Login failed:", error.response?.data || error.message);
    throw error;
  }
};
