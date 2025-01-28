import React from 'react';
import { usePoster } from '../context/PosterContext';

const TextControls = () => {
  const { texts, selectedId, handleTextChange } = usePoster();
  const selectedText = texts.find((t) => t.id === selectedId);

  if (!selectedText) return null;

  const toggleStyle = (style) => {
    const currentStyles = selectedText.fontStyle.split(' ');
    const hasStyle = currentStyles.includes(style);
    
    const newStyles = hasStyle
      ? currentStyles.filter(s => s !== style)
      : [...currentStyles, style];
    
    handleTextChange(selectedId, {
      fontStyle: newStyles.join(' ').trim() || 'normal'
    });
  };

  const toggleDecoration = (decoration) => {
    const currentDecorations = selectedText.textDecoration.split(' ');
    const hasDecoration = currentDecorations.includes(decoration);
    
    const newDecorations = hasDecoration
      ? currentDecorations.filter(d => d !== decoration)
      : [...currentDecorations, decoration];
    
    handleTextChange(selectedId, {
      textDecoration: newDecorations.join(' ').trim()
    });
  };

  return (
    <div className="mt-3">
      <div className="mb-2">
        <label className="form-label">Text Content</label>
        <input
          type="text"
          className="form-control"
          value={selectedText.text}
          onChange={(e) => handleTextChange(selectedId, { text: e.target.value })}
        />
      </div>
      
      <div className="mb-2">
        <label className="form-label">Font Style</label>
        <div className="btn-group w-100">
          <button
            type="button"
            className={`btn btn-sm ${selectedText.fontStyle.includes('bold') ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => toggleStyle('bold')}
          >
            B
          </button>
          <button
            type="button"
            className={`btn btn-sm ${selectedText.fontStyle.includes('italic') ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => toggleStyle('italic')}
          >
            I
          </button>
          <button
            type="button"
            className={`btn btn-sm ${selectedText.textDecoration.includes('underline') ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => toggleDecoration('underline')}
          >
            U
          </button>
        </div>
      </div>

      <div className="mb-2">
        <label className="form-label">Font Size</label>
        <input
          type="number"
          className="form-control"
          value={selectedText.fontSize}
          onChange={(e) =>
            handleTextChange(selectedId, { fontSize: parseInt(e.target.value) })
          }
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Text Color</label>
        <input
          type="color"
          className="form-control form-control-color w-100"
          value={selectedText.fill}
          onChange={(e) => handleTextChange(selectedId, { fill: e.target.value })}
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Background Color</label>
        <input
          type="color"
          className="form-control form-control-color w-100"
          value={selectedText.backgroundColor || '#ffffff'}
          onChange={(e) => handleTextChange(selectedId, { backgroundColor: e.target.value })}
        />
        <div className="form-check mt-1">
          <input
            type="checkbox"
            className="form-check-input"
            id="enableBackground"
            checked={!!selectedText.backgroundColor}
            onChange={(e) => handleTextChange(selectedId, {
              backgroundColor: e.target.checked ? '#ffffff' : ''
            })}
          />
          <label className="form-check-label" htmlFor="enableBackground">
            Enable background color
          </label>
        </div>
        
        {selectedText.backgroundColor && (
          <>
            <div className="mt-2">
              <label className="form-label">Background Opacity</label>
              <input
                type="range"
                className="form-range"
                min="0"
                max="1"
                step="0.1"
                value={selectedText.backgroundOpacity}
                onChange={(e) => handleTextChange(selectedId, {
                  backgroundOpacity: parseFloat(e.target.value)
                })}
              />
            </div>
            
            <div className="mt-2">
              <label className="form-label">Corner Radius</label>
              <input
                type="range"
                className="form-range"
                min="0"
                max="80"
                value={selectedText.cornerRadius}
                onChange={(e) => handleTextChange(selectedId, {
                  cornerRadius: parseInt(e.target.value)
                })}
              />
            </div>

            <div className="mt-2">
              <label className="form-label">Background Padding</label>
              <input
                type="range"
                className="form-range"
                min="0"
                max="50"
                value={selectedText.padding}
                onChange={(e) => handleTextChange(selectedId, {
                  padding: parseInt(e.target.value)
                })}
              />
              <div className="d-flex justify-content-between text-muted small">
                <span>0px</span>
                <span>50px</span>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mb-2">
        <label className="form-label">Font Family</label>
        <select
          className="form-select"
          value={selectedText.fontFamily}
          onChange={(e) =>
            handleTextChange(selectedId, { fontFamily: e.target.value })
          }
        >
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
          <option value="Verdana">Verdana</option>
        </select>
      </div>
    </div>
  );
};

export default TextControls;