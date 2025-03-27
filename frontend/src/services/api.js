import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Ensure this matches your backend URL

// Fetch all donor posts
export const fetchPosts = async () => {
  try {
    return await axios.get("http://localhost:5000/api/users/register",userdata);
  } catch (error) {
    console.error("❌ Error fetching posts:", error.response?.data || error.message);
    throw error;
  }
};

// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, userData);
    return response.data;
  } catch (error) {
    console.error("❌ Registration failed:", error.response?.data || error.message);
    throw error;
  }
};

// Login a user
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, userData);
    return response.data;
  } catch (error) {
    console.error("❌ Login failed:", error.response?.data || error.message);
    throw error;
  }
};
