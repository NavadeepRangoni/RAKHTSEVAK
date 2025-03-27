import React, { useEffect, useState } from "react";
import { fetchPosts } from "../services/api";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
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
  }, []);

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>Failed to load posts. Please try again later.</div>;

  return (
    <div>
      <h1>Emergency Blood Requests</h1>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
