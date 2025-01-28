import React from 'react';
import Sidebar from './Sidebar';
import Canvas from './Canvas';

const PosterMaker = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <Canvas />
    </div>
  );
};

export default PosterMaker;