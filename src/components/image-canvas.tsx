'use client';

import React from 'react';

interface ImageCanvasProps {
  image: string | null;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
}

const ImageCanvas: React.FC<ImageCanvasProps> = ({ image, fileInputRef, handleFileChange, loading }) => {
  const handleDownload = () => {
    if (image) {
      const a = document.createElement('a');
      a.href = image;
      a.download = 'edited-image.png';
      a.click();
    }
  };

  return (
    <div className="w-[70vw] h-[70vh] bg-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden">
      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
        </div>
      )}
      {image ? (
        <img src={image} alt="edited image" className={`w-full h-full object-contain ${loading ? 'opacity-50' : ''}`} />
      ) : (
        <p className="text-gray-400">Upload an image to start</p>
      )}
      {image && (
        <button onClick={handleDownload} className="absolute top-4 right-4 bg-gray-800 hover:bg-gray-700 text-white font-bold p-2 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ImageCanvas;