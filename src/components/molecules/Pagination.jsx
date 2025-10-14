import React from 'react';
import Button from '../atoms/Button.jsx';

const Pagination = ({ currentPage, totalPages, onPrev, onNext }) => {
  return (
    <div className="flex gap-2 justify-center mt-4">
      <Button onClick={onPrev} disabled={currentPage === 1}>Prev</Button>
      <span>{currentPage} / {totalPages}</span>
      <Button onClick={onNext} disabled={currentPage === totalPages}>Next</Button>
    </div>
  );
};

export default Pagination;
