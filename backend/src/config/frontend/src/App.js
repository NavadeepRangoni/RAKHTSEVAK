import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"; // Import Login Page
import Register from "./pages/Register"; // Import Register Page
import Dashboard from "./pages/Dashboard"; // Import Dashboard Page
import PrivateRoute from "./components/PrivateRoute"; // Import Private Route

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Route: Dashboard (Only accessible after login) */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        
        {/* Default Route - Redirect to Login */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
