"use client"

import React from 'react';
import { motion } from 'framer-motion';

const FormField = ({ label, htmlFor, required = false, children, className = '' }) => {
  return (
    <motion.div 
      className={`relative mb-6 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label 
        htmlFor={htmlFor} 
        className="block text-gray-700 font-medium mb-2 transition-colors duration-300 group-hover:text-orange-500"
      >
        {label} {required && <span className="text-orange-500">*</span>}
      </label>
      <div className="relative group">
        {children}
        <div className="absolute inset-0 border border-orange-300 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
    </motion.div>
  );
};

export default FormField;