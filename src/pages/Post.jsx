//src/pages/Post.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import appwriteService from '../appwrite/config';
import Button from '../components/Button';
import Container from '../components/container/Container';
import { useSelector } from 'react-redux';

const Post = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector(state => state.auth.userData);
  const isAuthor = post && userData && post.userId === userData.$id;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((data) => {
        if (data) setPost(data);
        else navigate('/');
      });
    }
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate('/');
      }
    });
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="mb-6">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl mb-4 w-full"
          />
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <div>{post.content}</div>
        </div>
        {isAuthor && (
          <div className="flex space-x-4">
            <Button bgColor="bg-green-500" onClick={() => navigate(`/edit-post/${post.$id}`)}>Edit</Button>
            <Button bgColor="bg-red-500" onClick={deletePost}>Delete</Button>
          </div>
        )}
      </Container>
    </div>
  ) : null;
};

export default Post;
