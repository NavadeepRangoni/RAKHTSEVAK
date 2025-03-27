import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Update this URL to match your backend configuration

export const fetchPosts = () => axios.get(`${API_URL}/posts`);

export const registerUser = (userData) =>
  axios.post(`${API_URL}/users/register`, userData);

export const loginUser = (userData) =>
  axios.post(`${API_URL}/users/login`, userData);
