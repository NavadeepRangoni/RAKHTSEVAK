import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";
import "./styles.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    bloodType: "",
    location: "",
    contact: ""
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUserData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        bloodType: formData.bloodType,
        city: formData.location,
        contact: formData.contact
      };

      const response = await registerUser(updatedUserData);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      setError(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  const handleLearnMore = () => {
    window.open("/about.html","_blank");
  };

  return (
    <div className="register-container" style={{
      background: "linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(255, 23, 68, 0.7)), url('https://images.unsplash.com/photo-1615461066841-6116e61058f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      color: "white",
      padding: "80px 0",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Overlay */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)"
      }}></div>

      <div className="container position-relative" style={{ zIndex: 1 }}>
        {/* Hero Section with Registration Form */}
        <div className="row align-items-center mb-5">
          <div className="col-lg-6 text-center text-lg-start mb-5 mb-lg-0">
            <h1 className="display-4 mb-4">Save Lives With Your Phone</h1>
            <p className="lead mb-5">Connect with blood banks and donors instantly. Your donation journey is now just a tap away.</p>
            <div className="d-flex justify-content-center justify-content-lg-start">
              <button className="btn btn-custom btn-lg me-3" onClick={() => navigate("/login")}>
                LOGIN / SIGN UP
              </button>
              <button className="btn btn-outline-light btn-lg" onClick={handleLearnMore}  aria-label="Learn more about LifeDrop">
                Learn More
              </button>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card shadow-lg border-0" style={{
              background: "rgba(255, 255, 255, 0.9)",
              borderRadius: "20px",
              transition: "all 0.3s ease-in-out"
            }}>
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <i className="fas fa-user-plus fa-3x text-danger mb-3"></i>
                  <h2 className="fw-bold">Join RAKHTSEVAK</h2>
                  <p className="text-muted">Become a life saver today</p>
                </div>

                {error && (
                  <div className="alert alert-danger text-center">{error}</div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Full Name"
                        onChange={handleChange}
                        required
                        style={{
                          border: "2px solid #eee",
                          borderRadius: "15px",
                          padding: "12px 20px"
                        }}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Email Address"
                        onChange={handleChange}
                        required
                        style={{
                          border: "2px solid #eee",
                          borderRadius: "15px",
                          padding: "12px 20px"
                        }}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                        minLength="6"
                        style={{
                          border: "2px solid #eee",
                          borderRadius: "15px",
                          padding: "12px 20px"
                        }}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <input
                        type="password"
                        className="form-control"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        required
                        style={{
                          border: "2px solid #eee",
                          borderRadius: "15px",
                          padding: "12px 20px"
                        }}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <select
                        className="form-select"
                        name="bloodType"
                        onChange={handleChange}
                        required
                        style={{
                          border: "2px solid #eee",
                          borderRadius: "15px",
                          padding: "12px 20px",
                          appearance: "none",
                          backgroundImage: "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23FF4B6A' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 15px center",
                          backgroundSize: "15px"
                        }}
                      >
                        <option value="">Select Blood Type</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <input
                        type="text"
                        className="form-control"
                        name="location"
                        placeholder="Location"
                        onChange={handleChange}
                        required
                        style={{
                          border: "2px solid #eee",
                          borderRadius: "15px",
                          padding: "12px 20px"
                        }}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <input
                      type="tel"
                      className="form-control"
                      name="contact"
                      placeholder="Contact Number"
                      onChange={handleChange}
                      required
                      style={{
                        border: "2px solid #eee",
                        borderRadius: "15px",
                        padding: "12px 20px"
                      }}
                    />
                  </div>

                  <div className="form-check mb-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="terms"
                      required
                    />
                    <label className="form-check-label" htmlFor="terms">
                      I agree to the <a href="#" className="text-danger">Terms and Conditions</a>
                    </label>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-danger w-100 py-2"
                    style={{
                      background: "linear-gradient(45deg, #FF4B6A, #FF1744)",
                      color: "white",
                      border: "none",
                      borderRadius: "30px",
                      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      position: "relative",
                      overflow: "hidden"
                    }}
                  >
                    <i className="fas fa-user-plus me-2"></i> Register
                  </button>

                  <div className="text-center mt-4">
                    <p className="mb-0">
                      Already have an account?{" "}
                      <a href="/login" className="text-danger fw-bold">
                        Login
                      </a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose LifeDrop Section */}
        <div className="row mb-5">
          <div className="col-12 text-center mb-5">
            <h2 className="display-5">Why Choose RAKHTSEVAK?</h2>
          </div>
          <div className="col-md-4 mb-4">
            <div className="feature-card text-center p-4 h-100" style={{
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "15px",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)"
            }}>
              <div className="feature-icon mb-4" style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--primary-color), var(--secondary-color))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                color: "white",
                fontSize: "2rem"
              }}>
                <i className="fas fa-mobile-alt"></i>
              </div>
              <h3>Easy to Use</h3>
              <p>Book appointments and track donations right from your phone</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="feature-card text-center p-4 h-100" style={{
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "15px",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)"
            }}>
              <div className="feature-icon mb-4" style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--primary-color), var(--secondary-color))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                color: "white",
                fontSize: "2rem"
              }}>
                <i className="fas fa-clock"></i>
              </div>
              <h3>24/7 Support</h3>
              <p>Round-the-clock assistance for donors and recipients</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="feature-card text-center p-4 h-100" style={{
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "15px",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)"
            }}>
              <div className="feature-icon mb-4" style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--primary-color), var(--secondary-color))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                color: "white",
                fontSize: "2rem"
              }}>
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h3>Nearby Centers</h3>
              <p>Find blood donation centers in your vicinity</p>
            </div>
          </div>
        </div>

        {/* Impact Statistics and Phone Container Side by Side */}
        <div className="row align-items-center">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <div className="text-center">
              <h2 className="mb-5">Impact Statistics</h2>
              <div className="row">
                <div className="col-6 col-md-3 mb-4">
                  <div className="stat-card" style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "15px",
                    padding: "20px",
                    textAlign: "center",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)"
                  }}>
                    <h3 className="display-4">100+</h3>
                    <p>Active Donors</p>
                  </div>
                </div>
                <div className="col-6 col-md-3 mb-4">
                  <div className="stat-card" style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "15px",
                    padding: "20px",
                    textAlign: "center",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)"
                  }}>
                    <h3 className="display-4">500+</h3>
                    <p>Partner Hospitals</p>
                  </div>
                </div>
                <div className="col-6 col-md-3 mb-4">
                  <div className="stat-card" style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "15px",
                    padding: "20px",
                    textAlign: "center",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)"
                  }}>
                    <h3 className="display-4">300+</h3>
                    <p>Lives Saved</p>
                  </div>
                </div>
                <div className="col-6 col-md-3 mb-4">
                  <div className="stat-card" style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "15px",
                    padding: "20px",
                    textAlign: "center",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)"
                  }}>
                    <h3 className="display-4">98%</h3>
                    <p>Success Rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="phone-container" style={{
              maxWidth: "300px",
              margin: "0 auto",
              border: "12px solid #333",
              borderRadius: "40px",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
              background: "white",
              padding: "20px",
              overflow: "hidden",
              position: "relative"
            }}>
              <div className="phone-notch" style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "150px",
                height: "25px",
                background: "#333",
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px"
              }}></div>
              <div className="phone-screen" style={{
                borderRadius: "20px",
                overflow: "hidden",
                position: "relative"
              }}>
                <div className="phone-content" style={{
                  padding: "40px 15px 20px",
                  textAlign: "center",
                  color: "var(--text-color)"
                }}>
                  <i className="fas fa-heart-pulse mb-4" style={{
                    color: "var(--primary-color)",
                    fontSize: "2.5rem"
                  }}></i>
                  <h3>RAKHTSEVAK App</h3>
                  <p>Donate blood, save lives</p>
                  <div className="blood-type-grid" style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                    gap: "10px",
                    marginTop: "20px"
                  }}>
                    <div className="blood-type-card" style={{
                      background: "white",
                      borderRadius: "15px",
                      padding: "15px",
                      textAlign: "center",
                      transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                      position: "relative",
                      overflow: "hidden",
                      border: "2px solid transparent"
                    }}>
                      <h4>A+</h4>
                      <p>Needed</p>
                    </div>
                    <div className="blood-type-card" style={{
                      background: "white",
                      borderRadius: "15px",
                      padding: "15px",
                      textAlign: "center",
                      transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                      position: "relative",
                      overflow: "hidden",
                      border: "2px solid transparent"
                    }}>
                      <h4>O+</h4>
                      <p>Urgent</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;