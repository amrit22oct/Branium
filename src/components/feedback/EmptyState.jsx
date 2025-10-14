import React from 'react';

const EmptyState = ({ message = "Nothing here!" }) => (
  <div className="flex justify-center items-center h-64 text-gray-500">
    {message}
  </div>
);

export default EmptyState;
