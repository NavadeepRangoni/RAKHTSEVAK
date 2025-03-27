import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { fetchPosts } from "../services/api";
import "./styles.css";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem("userdata"));

      if (!user) {
        navigate("/login"); // Redirect to login if not authenticated
        return;
      }

      try {
        const response = await fetchPosts();
        setPosts(response.data);
      } catch (err) {
        console.error("Error fetching posts", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-danger text-center mt-5">
        Failed to load posts. Please try again later.
      </div>
    );

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5 text-danger fw-bold">
        <i className="fas fa-heartbeat me-2"></i> Emergency Blood Requests
      </h1>

      {posts.length === 0 ? (
        <div className="alert alert-info text-center">
          No emergency blood requests available at the moment.
        </div>
      ) : (
        <div className="row">
          {posts.map((post) => (
            <div key={post.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 transition-card">
                <div className="card-body">
                  <h3 className="card-title text-danger">{post.title}</h3>
                  <p className="card-text">{post.description}</p>
                  <div className="blood-type-badge bg-danger text-white px-3 py-1 rounded-pill d-inline-block">
                    {post.bloodType || "All Types"}
                  </div>
                </div>
                <div className="card-footer bg-transparent">
                  <button className="btn btn-sm btn-outline-danger">
                    <i className="fas fa-hand-holding-medical me-2"></i>Respond
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
