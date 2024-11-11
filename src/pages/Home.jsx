
// export default Home;
import React, { useState, useEffect } from 'react';
import appwriteService from "../appwrite/config";
import PostCard from '../components/PostCard';
import Container from '../components/container/Container';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await appwriteService.getPosts([]);
        if (response && response.documents) {
          setPosts(response.documents);
        } else {
          setError('Failed to fetch posts');
        }
      } catch (err) {
        setError('An error occurred while fetching posts');
        console.error('Error fetching posts:', err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="py-8">
      <Container>
        {error ? (
          <h1>{error}</h1>
        ) : posts.length === 0 ? (
          <h1>No posts available. Please login to read posts.</h1>
        ) : (
          <div className="flex flex-wrap">
            {posts.map(post => <PostCard key={post.$id} {...post} />)}
          </div>
        )}
      </Container>
    </div>
  );
};

export default Home;
