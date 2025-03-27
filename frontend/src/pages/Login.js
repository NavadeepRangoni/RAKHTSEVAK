import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import "./styles.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      localStorage.setItem("token", response.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-background"></div>
      
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="login-card">
              <div className="login-header">
                <i className="fas fa-heart-pulse text-danger"></i>
                <h2>Login to RAKHTSEVAK</h2>
                <p>Save lives with your donation</p>
              </div>

              {error && <div className="login-error">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <i className="fas fa-envelope"></i>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <i className="fas fa-lock"></i>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-options">
                  <label>
                    <input type="checkbox" name="rememberMe" /> Remember me
                  </label>
                  <a href="#" className="forgot-password">Forgot password?</a>
                </div>

                <button type="submit" className="login-btn">
                  <i className="fas fa-sign-in-alt"></i> Login
                </button>

                <div className="register-link">
                  Don't have an account? <a href="/register">Register</a>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="row justify-content-center mt-5">
          <div className="col-md-8 col-lg-6">
            <div className="contact-card">
              <h3>Have questions? We're here to help!</h3>
              
              <button className="contact-btn">
                <i className="fas fa-envelope"></i> Contact Us
              </button>

              <div className="contact-info">
                <div className="contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>123 Blood Bank Street, City, Country</span>
                </div>
                <div className="contact-item">
                  <i className="fas fa-phone-alt"></i>
                  <span>+1 234 567 890</span>
                </div>
                <div className="contact-item">
                  <i className="fas fa-envelope"></i>
                  <span>contact@lifedrop.com</span>
                </div>
                <div className="contact-item">
                  <i className="fas fa-clock"></i>
                  <span>Working Hours: Mon - Sat (9 AM - 8 PM)</span>
                </div>
              </div>

              <div className="social-section">
                <h5>Follow Us</h5>
                <div className="social-icons">
                  <a href="#"><i className="fab fa-facebook-f"></i></a>
                  <a href="#"><i className="fab fa-twitter"></i></a>
                  <a href="#"><i className="fab fa-instagram"></i></a>
                  <a href="#"><i className="fab fa-linkedin-in"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;