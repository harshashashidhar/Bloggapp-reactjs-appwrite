//src/components/Input.jsx
import React, { forwardRef } from 'react';

const Input = forwardRef(({ label, type = 'text', className = "", ...props }, ref) => (
  <div className="w-full mb-4">
    {label && <label className="block text-sm mb-2">{label}</label>}
    <input
      type={type}
      ref={ref}
      className={`px-4 py-2 rounded-lg bg-white text-gray-800 outline-none border border-gray-300 w-full ${className}`}
      {...props}
    />
  </div>
));

export default Input;
