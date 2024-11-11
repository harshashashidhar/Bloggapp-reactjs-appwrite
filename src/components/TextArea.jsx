//src/components/TextArea.jsx
import React from 'react';

const TextArea = ({ label, value, onChange, placeholder, className }) => (
  <div className="w-full mb-4">
    {label && <label className="block text-sm mb-2">{label}</label>}
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`px-4 py-2 rounded-lg bg-white text-gray-800 outline-none border border-gray-300 w-full ${className}`}
    />
  </div>
);

export default TextArea;
