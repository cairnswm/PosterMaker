import React from 'react';
import { usePoster } from '../context/PosterContext';

const TextList = () => {
  const { texts, selectedId, setSelectedId, handleTextDelete } = usePoster();

  const handleClick = (e, id) => {
    e.stopPropagation(); // Prevent event from bubbling to section header
    setSelectedId(id === selectedId ? null : id);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    handleTextDelete(id);
  };

  return (
    <div className="list-group">
      {texts.map((text) => (
        <div
          key={text.id}
          className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${
            selectedId === text.id ? 'active' : ''
          }`}
          onClick={(e) => handleClick(e, text.id)}
        >
          <div className="d-flex align-items-center">
            <span>{text.text}</span>
          </div>
          <button
            className="btn btn-danger btn-sm"
            onClick={(e) => handleDelete(e, text.id)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default TextList;