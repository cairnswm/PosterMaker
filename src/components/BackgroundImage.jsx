import React from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';

const BackgroundImage = ({ src, width, height, name }) => {
  const [image] = useImage(src);
  return (
    <Image
      image={image}
      width={width}
      height={height}
      name={name}
      listening={true}
    />
  );
};

export default BackgroundImage;