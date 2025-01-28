import React, { useRef, useEffect } from 'react';
import { Image, Transformer } from 'react-konva';
import useImage from 'use-image';
import { usePoster } from '../context/PosterContext';

const ImageElement = ({ imageProps, isSelected }) => {
  const { setSelectedId, handleImageChange } = usePoster();
  const [image] = useImage(imageProps.src);
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const handleClick = (e) => {
    e.cancelBubble = true; // Stop event from bubbling up
    setSelectedId(imageProps.id);
  };

  return (
    <>
      <Image
        {...imageProps}
        ref={shapeRef}
        image={image}
        draggable
        onClick={handleClick}
        onTap={handleClick}
        onDragEnd={(e) => {
          handleImageChange(imageProps.id, {
            ...imageProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={() => {
          if (!shapeRef.current) return;

          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);

          handleImageChange(imageProps.id, {
            ...imageProps,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            const minSize = 5;
            if (newBox.width < minSize || newBox.height < minSize) {
              return oldBox;
            }
            return newBox;
          }}
          keepRatio={true}
          enabledAnchors={[
            'top-left',
            'top-right',
            'bottom-left',
            'bottom-right'
          ]}
          rotateEnabled={false}
        />
      )}
    </>
  );
};

export default ImageElement;