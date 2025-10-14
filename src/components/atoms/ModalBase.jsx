import React from 'react';

const ModalBase = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded">{children}</div>
    </div>
  );
};

export default ModalBase;
