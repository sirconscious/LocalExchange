"use client"

import React from 'react';
import { motion } from 'framer-motion';

const ImagePreview = ({ images, onRemove }) => {
  if (!images || images.length === 0) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-gray-700">Uploaded Images ({images.length})</p>
        {images.length > 0 && (
          <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
            {images.length} {images.length === 1 ? 'image' : 'images'} ready
          </span>
        )}
      </div>
      
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {images.map((image, index) => (
          <motion.div 
            key={index}
            className="relative group aspect-square overflow-hidden rounded-lg border border-gray-200 shadow-sm bg-white"
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <img 
              src={URL.createObjectURL(image)} 
              alt={`Preview ${index}`} 
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div 
              className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all duration-300"
            >
              <button 
                onClick={() => onRemove(index)} 
                className="bg-white text-red-500 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-50 transform translate-y-2 group-hover:translate-y-0"
                aria-label="Remove image"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-white text-xs truncate">{image.name}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ImagePreview;