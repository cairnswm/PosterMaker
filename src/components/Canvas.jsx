import React from 'react';
import { Stage, Layer } from 'react-konva';
import BackgroundImage from './BackgroundImage';
import ImageElement from './ImageElement';
import TextElement from './TextElement';
import { usePoster } from '../context/PosterContext';

const Canvas = () => {
  const {
    background,
    images,
    texts,
    selectedId,
    stageSize,
    stageRef,
    clearSelection,
  } = usePoster();

  const handleStageClick = (e) => {
    // Get the clicked target and the stage
    const clickedOnEmpty = e.target === e.target.getStage();
    const clickedOnBackground = e.target.name() === 'background-image';
    
    // Clear selection if clicked on empty stage or background
    if (clickedOnEmpty || clickedOnBackground) {
      clearSelection();
    }
  };

  return (
    <div className="flex-grow-1 bg-white d-flex align-items-center justify-content-center" style={{ height: '100vh', overflow: 'auto' }}>
      <div style={{ border: '1px solid #ccc', background: '#f8f9fa' }}>
        <Stage
          ref={stageRef}
          width={stageSize.width}
          height={stageSize.height}
          onClick={handleStageClick}
        >
          <Layer>
            {background && (
              <BackgroundImage
                src={background}
                width={stageSize.width}
                height={stageSize.height}
                name="background-image"
              />
            )}
            {images.map((img) => (
              <ImageElement
                key={img.id}
                imageProps={img}
                isSelected={selectedId === img.id}
              />
            ))}
            {texts.map((text) => (
              <TextElement
                key={text.id}
                textProps={text}
                isSelected={selectedId === text.id}
              />
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default Canvas;