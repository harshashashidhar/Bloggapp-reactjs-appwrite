//src/components/PostCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import appwriteService from '../appwrite/config';

const PostCard = ({ $id, title, featuredImage }) => (
  <Link to={`/post/${$id}`} className="p-2 w-1/4">
    <div className="bg-gray-100 rounded-xl p-4 shadow-md hover:shadow-lg transition-all">
      <img
        src={appwriteService.getFilePreview(featuredImage)}
        alt={title}
        className="rounded-xl mb-4"
      />
      <h3 className="text-lg font-bold">{title}</h3>
    </div>
  </Link>
);

export default PostCard;
