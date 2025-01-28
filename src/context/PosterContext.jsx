import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const PosterContext = createContext(null);

export const PosterProvider = ({ children }) => {
  const [background, setBackground] = useState(null);
  const [images, setImages] = useState([]);
  const [texts, setTexts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [stageSize, setStageSize] = useState({ width: 800, height: 600 });
  const stageRef = useRef(null);

  // Make context available globally for the header buttons
  useEffect(() => {
    window.posterContext = {
      exportPoster: () => exportPoster(),
      importPoster,
      saveAsImage,
      newPoster
    };
    return () => {
      delete window.posterContext;
    };
  }, [background, images, texts, stageSize]); // Add dependencies to ensure latest state

  const newPoster = () => {
    setBackground(null);
    setImages([]);
    setTexts([]);
    setSelectedId(null);
    setStageSize({ width: 800, height: 600 });
  };

  const handleBackgroundUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new window.Image();
        img.src = reader.result;
        img.onload = () => {
          setStageSize({
            width: img.width,
            height: img.height,
          });
          setBackground(reader.result);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new window.Image();
        img.src = reader.result;
        img.onload = () => {
          const maxSize = 200;
          let width = img.width;
          let height = img.height;
          
          if (width > height) {
            if (width > maxSize) {
              height = (height * maxSize) / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width = (width * maxSize) / height;
              height = maxSize;
            }
          }

          const newImage = {
            src: reader.result,
            x: stageSize.width / 4,
            y: stageSize.height / 4,
            width,
            height,
            id: Date.now().toString(),
          };
          setImages(prevImages => [...prevImages, newImage]);
          setSelectedId(newImage.id);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = (id) => {
    setImages(images.filter(img => img.id !== id));
    if (selectedId === id) {
      setSelectedId(null);
    }
  };

  const handleTextDelete = (id) => {
    setTexts(texts.filter(text => text.id !== id));
    if (selectedId === id) {
      setSelectedId(null);
    }
  };

  const addText = () => {
    const newText = {
      text: 'New Text',
      x: stageSize.width / 4,
      y: stageSize.height / 4,
      fontSize: 24,
      fill: '#000000',
      id: Date.now().toString(),
      fontFamily: 'Arial',
      draggable: true,
      fontStyle: 'normal',
      textDecoration: '',
      backgroundColor: '',
      backgroundOpacity: 1,
      cornerRadius: 0,
      padding: 5,
    };
    setTexts(prevTexts => [...prevTexts, newText]);
    setSelectedId(newText.id);
  };

  const handleTextChange = (id, newProps) => {
    setTexts(texts.map((t) => (t.id === id ? { ...t, ...newProps } : t)));
  };

  const handleImageChange = (id, newProps) => {
    setImages(images.map((img) => (img.id === id ? { ...img, ...newProps } : img)));
  };

  const clearSelection = () => {
    setSelectedId(null);
  };

  const exportPoster = () => {
    // Create a snapshot of the current state
    const posterData = {
      version: '1.0',
      background,
      images: [...images], // Create new array to ensure we get latest state
      texts: [...texts], // Create new array to ensure we get latest state
      stageSize: { ...stageSize }, // Create new object to ensure we get latest state
    };

    // Create and trigger download
    const blob = new Blob([JSON.stringify(posterData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'poster.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importPoster = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const posterData = JSON.parse(e.target.result);
        if (posterData.version === '1.0') {
          setBackground(posterData.background);
          setImages(posterData.images);
          setTexts(posterData.texts);
          setStageSize(posterData.stageSize);
          setSelectedId(null);
        } else {
          alert('Unsupported poster file version');
        }
      } catch (error) {
        alert('Invalid poster file format');
      }
    };
    reader.readAsText(file);
  };

  const saveAsImage = () => {
    if (!stageRef.current) return;
    
    // Store the current selection
    const currentSelection = selectedId;
    
    // Clear selection to hide handles and borders
    setSelectedId(null);
    
    // Wait for the next render cycle
    setTimeout(() => {
      const uri = stageRef.current.toDataURL();
      const link = document.createElement('a');
      link.download = 'poster.png';
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Restore the selection
      setSelectedId(currentSelection);
    }, 100);
  };

  return (
    <PosterContext.Provider
      value={{
        background,
        images,
        texts,
        selectedId,
        stageSize,
        stageRef,
        handleBackgroundUpload,
        handleImageUpload,
        handleImageDelete,
        handleTextDelete,
        addText,
        handleTextChange,
        handleImageChange,
        setSelectedId,
        clearSelection,
        exportPoster,
        importPoster,
        saveAsImage,
        newPoster,
      }}
    >
      {children}
    </PosterContext.Provider>
  );
};

export const usePoster = () => {
  const context = useContext(PosterContext);
  if (!context) {
    throw new Error('usePoster must be used within a PosterProvider');
  }
  return context;
};