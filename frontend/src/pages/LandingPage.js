import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaHeartPulse, 
  FaMobileAlt, 
  FaClock, 
  FaMapMarkerAlt, 
  FaUsers, 
  FaHospital, 
  FaHeart, 
  FaTrophy,
  FaSignInAlt,
  FaUserPlus,
  FaChartLine,
  FaSearch,
  FaBell
} from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './LandingPage.css';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [dashboardPreview, setDashboardPreview] = useState(null);
  const navigate = useNavigate();
  const { login, currentUser } = useAuth();
  const slides = ['home', 'about', 'login', 'contact'];

  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }

    // Load dashboard preview data
    const loadDashboardPreview = async () => {
      try {
        // Mock data - replace with actual API call in production
        const mockData = {
          recentRequests: [
            { bloodType: 'O+', location: 'City Hospital', urgency: 'High' },
            { bloodType: 'AB-', location: 'Regional Center', urgency: 'Medium' }
          ],
          donorStats: {
            total: 12450,
            active: 8432
          }
        };
        setDashboardPreview(mockData);
      } catch (err) {
        console.error("Failed to load dashboard preview:", err);
      }
    };

    loadDashboardPreview();

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, currentUser, navigate]);

  // ... (keep existing slide navigation functions)

  const handleDashboardRedirect = () => {
    if (currentUser) {
      navigate('/dashboard');
    } else {
      showSlide('login');
    }
  };

  // ... (keep existing handleLoginSubmit function)

  return (
    <div className="landing-page">
      {/* ... (keep existing navbar and slide navigation) */}

      {/* Enhanced Home Slide with Dashboard Preview */}
      <div id="home" className={`slide ${currentSlideIndex === 0 ? 'active' : ''}`}>
        <section className="heroSection">
          {/* ... (keep existing hero content) */}
        </section>

        <section className="py-5">
          <div className="container">
            <h2 className="text-center mb-5">Why Choose LifeDrop?</h2>
            <div className="row">
              {/* ... (keep existing feature cards) */}
            </div>
          </div>
        </section>

        {/* New Dashboard Preview Section */}
        <section className="py-5 bg-light">
          <div className="container">
            <h2 className="text-center mb-5">See What's Inside</h2>
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="dashboard-preview-card">
                  <div className="dashboard-header p-3 bg-danger text-white rounded-top">
                    <div className="d-flex justify-content-between align-items-center">
                      <h4 className="m-0">
                        <FaChartLine className="me-2" /> Your Dashboard
                      </h4>
                      <div>
                        <FaSearch className="me-3" />
                        <FaBell />
                      </div>
                    </div>
                  </div>
                  
                  <div className="dashboard-body bg-white p-4 rounded-bottom">
                    {dashboardPreview ? (
                      <>
                        <div className="row mb-4">
                          <div className="col-md-6">
                            <div className="stat-card">
                              <h5>Total Donors</h5>
                              <h3 className="text-danger">
                                {dashboardPreview.donorStats.total.toLocaleString()}
                              </h3>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="stat-card">
                              <h5>Active Donors</h5>
                              <h3 className="text-danger">
                                {dashboardPreview.donorStats.active.toLocaleString()}
                              </h3>
                            </div>
                          </div>
                        </div>
                        
                        <h5 className="mb-3">Recent Blood Requests</h5>
                        <div className="request-list">
                          {dashboardPreview.recentRequests.map((request, index) => (
                            <div key={index} className="request-item p-3 mb-2 border rounded">
                              <div className="d-flex justify-content-between">
                                <div>
                                  <strong className="text-danger">{request.bloodType}</strong>
                                  <span className="ms-2">{request.location}</span>
                                </div>
                                <span className={`badge ${
                                  request.urgency === 'High' ? 'bg-danger' : 'bg-warning'
                                }`}>
                                  {request.urgency}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-4">
                        <div className="spinner-border text-danger" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    )}
                    
                    <button 
                      onClick={handleDashboardRedirect}
                      className="btn btn-danger w-100 mt-4 transitionBtn"
                    >
                      {currentUser ? 'Go to Dashboard' : 'Login to Access Dashboard'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ... (keep existing login and other slides) */}
    </div>
  );
};

export default LandingPage;