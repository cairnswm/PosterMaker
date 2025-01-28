import React from 'react';
import { usePoster } from '../context/PosterContext';

const ImageList = () => {
  const { images, selectedId, setSelectedId, handleImageDelete } = usePoster();

  const handleClick = (e, id) => {
    e.stopPropagation(); // Prevent event from bubbling to section header
    setSelectedId(id === selectedId ? null : id);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    handleImageDelete(id);
  };

  return (
    <div className="list-group">
      {images.map((img) => (
        <div
          key={img.id}
          className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${
            selectedId === img.id ? 'active' : ''
          }`}
          onClick={(e) => handleClick(e, img.id)}
        >
          <div className="d-flex align-items-center">
            <img
              src={img.src}
              alt="overlay"
              style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }}
            />
            <span>Image {img.id}</span>
          </div>
          <button
            className="btn btn-danger btn-sm"
            onClick={(e) => handleDelete(e, img.id)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImageList;