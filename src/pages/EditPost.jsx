//src/pages/EditPost.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PostForm from '../components/PostForm';
import appwriteService from '../appwrite/config';

const EditPost = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((data) => {
        if (data) setPost(data);
        else navigate('/');
      });
    }
  }, [slug, navigate]);

  return (
    <div className="py-8">
      {post && <PostForm post={post} />}
    </div>
  );
};

export default EditPost;
