import React from 'react';

const NotificationToast = ({ message, type = 'info' }) => {
  const bgColor = type === 'error' ? 'bg-red-500' : 'bg-green-500';
  return (
    <div className={`${bgColor} text-white p-2 rounded fixed bottom-4 right-4`}>
      {message}
    </div>
  );
};

export default NotificationToast;
