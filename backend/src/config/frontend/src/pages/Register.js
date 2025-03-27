import React, { useState } from "react";
import { registerUser } from "../services/api"; // Ensure this function exists in api.js

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    bloodType: "",
    location: "",
    contact: ""
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit called"); // <-- Add this here
    
    try {
      await registerUser(formData);
      alert("Registration successful!");
    } catch (error) {
      alert("Error registering user!");
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <input name="bloodType" placeholder="Blood Type" onChange={handleChange} required />
      <input name="location" placeholder="Location" onChange={handleChange} required />
      <input name="contact" placeholder="Contact" onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
