import React, { useRef, useEffect } from 'react';
import { Text, Transformer, Group, Rect } from 'react-konva';
import { usePoster } from '../context/PosterContext';

const TextElement = ({ textProps, isSelected }) => {
  const { setSelectedId, handleTextChange } = usePoster();
  const groupRef = useRef();
  const textRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected && trRef.current && groupRef.current) {
      trRef.current.nodes([groupRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  // Calculate text dimensions for background
  const textWidth = textRef.current?.width() || 0;
  const textHeight = textRef.current?.height() || 0;
  const padding = textProps.padding || 5;

  const handleClick = (e) => {
    e.cancelBubble = true; // Stop event from bubbling up
    setSelectedId(textProps.id);
  };

  return (
    <>
      <Group
        x={textProps.x}
        y={textProps.y}
        draggable
        ref={groupRef}
        onClick={handleClick}
        onTap={handleClick}
        onDragEnd={(e) => {
          handleTextChange(textProps.id, {
            ...textProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const node = groupRef.current;
          const scaleX = node.scaleX();

          node.scaleX(1);
          node.scaleY(1);
          
          handleTextChange(textProps.id, {
            ...textProps,
            x: node.x(),
            y: node.y(),
            fontSize: Math.max(1, textProps.fontSize * scaleX),
          });
        }}
      >
        {textProps.backgroundColor && (
          <Rect
            width={textWidth + (padding * 2)}
            height={textHeight + (padding * 2)}
            fill={textProps.backgroundColor}
            opacity={textProps.backgroundOpacity}
            cornerRadius={textProps.cornerRadius}
          />
        )}
        <Text
          {...textProps}
          ref={textRef}
          x={padding}
          y={padding}
          draggable={false}
          fill={textProps.fill}
          fontStyle={textProps.fontStyle}
          fontFamily={textProps.fontFamily}
          textDecoration={textProps.textDecoration}
        />
      </Group>
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default TextElement