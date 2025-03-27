import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "10px", backgroundColor: "#007bff", color: "white" }}>
      <Link to="/" style={{ marginRight: "15px", color: "white", textDecoration: "none" }}>
        Home
      </Link>
      <Link to="/register" style={{ marginRight: "15px", color: "white", textDecoration: "none" }}>
        Register
      </Link>
      <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
        Login
      </Link>
    </nav>
  );
};

export default Navbar;
