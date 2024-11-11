//src/components/PostForm.jsx
import React, { useState, useEffect } from 'react';
import Button from './Button';
import Input from './Input';
import TextArea from './TextArea';
import appwriteService from '../appwrite/config';  // Assuming this is your appwriteService module

const PostForm = ({ post = null }) => {
  const [title, setTitle] = useState(post ? post.title : '');
  const [slug, setSlug] = useState(post ? post.slug : '');
  const [content, setContent] = useState(post ? post.content : '');
  const [featuredImage, setFeaturedImage] = useState(post ? post.featuredImage : '');
  const [status, setStatus] = useState(post ? post.status : 'active');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // slug is generated from the title if empty
  useEffect(() => {
    if (title && !slug) {
      setSlug(appwriteService.generateSlug(title));
    }
  }, [title, slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!title || !content || !featuredImage) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    try {
      const user = await appwriteService.getCurrentUser(); 
      if (!user) {
        setError('User is not logged in.');
        setLoading(false);
        return;
      }

      const userId = user.$id;  

      if (post) {
        const updatedPost = await appwriteService.updatePost(post.slug, {
                title,
                slug: updatedSlug,
                content,
                featuredImage,
                status  
        });
        if (!updatedPost) throw new Error('Failed to update post');
      } else {
    
        const createdPost = await appwriteService.createPost({
          title,
          slug,
          content,
          featuredImage,
          status,
          userId
        });
        if (!createdPost) throw new Error('Failed to create post');
      }

      setLoading(false);
    } catch (err) {
      setError('An error occurred while saving the post.');
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <Input
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post Title"
      />

      <TextArea
        label="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Post Content"
      />

      <Input
        label="Featured Image URL"
        value={featuredImage}
        onChange={(e) => setFeaturedImage(e.target.value)}
        placeholder="Featured Image URL"
      />

      <div className="mb-4">
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
        <select
          id="status"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Saving...' : post ? 'Update Post' : 'Create Post'}
      </Button>
    </form>
  );
};

export default PostForm;
