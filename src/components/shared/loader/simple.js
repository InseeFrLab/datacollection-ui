import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';

const Simple = () => {
  return (
    <Backdrop open>
      <CircularProgress />
    </Backdrop>
  );
};

export default Simple;
