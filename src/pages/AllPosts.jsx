// src/pages/AllPosts.jsx
import React, { useState, useEffect } from 'react';
import appwriteService from '../appwrite/config'; 
import PostCard from '../components/PostCard'; 
import Container from '../components/container/Container';

const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
 
    const fetchPosts = async () => {
      try {
        const response = await appwriteService.getPosts([]);
        if (response) {
          setPosts(response.documents); 
        }
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <h2 className="text-center text-2xl font-bold mb-8">All Posts</h2>
        {posts.length === 0 ? (
          <p className="text-center text-lg text-gray-600">No posts available.</p>
        ) : (
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default AllPosts;
