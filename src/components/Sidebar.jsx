import React, { useRef } from 'react';
import ImageList from './ImageList';
import TextList from './TextList';
import TextControls from './TextControls';
import { usePoster } from '../context/PosterContext';

const Sidebar = () => {
  const { 
    handleBackgroundUpload, 
    handleImageUpload, 
    addText, 
    selectedId, 
    texts,
    clearSelection
  } = usePoster();

  return (
    <div className="bg-light border-end" style={{ width: '300px', height: '100vh', overflowY: 'auto', flexShrink: 0 }}>
      <div className="p-3">
        <div className="mb-3">
          <h5 onClick={clearSelection} style={{ cursor: 'pointer' }}>Background Image</h5>
          <input
            type="file"
            className="form-control mb-3"
            onChange={handleBackgroundUpload}
            accept="image/*"
            id="background-upload"
          />
        </div>
        
        <div className="mb-3">
          <h5 onClick={clearSelection} style={{ cursor: 'pointer' }}>Overlay Images</h5>
          <input
            type="file"
            className="form-control mb-3"
            onChange={handleImageUpload}
            accept="image/*"
            id="image-upload"
          />
          <ImageList />
        </div>

        <div className="mb-3">
          <h5 onClick={clearSelection} style={{ cursor: 'pointer' }}>Text Elements</h5>
          <button className="btn btn-primary w-100 mb-3" onClick={addText}>
            Add Text
          </button>
          <TextList />
          {selectedId && texts.some(t => t.id === selectedId) && <TextControls />}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;