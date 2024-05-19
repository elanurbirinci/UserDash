import React from 'react';
import Pagination from '@mui/material/Pagination';

function CustomPagination({ count, color, onChange }) {
  return (
    <Pagination count={count} color={color} onChange={onChange} />
  );
}

export default CustomPagination;
