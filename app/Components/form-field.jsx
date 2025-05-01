"use client"

import React from "react"
import { motion } from "framer-motion"

export default function FormField({
  label,
  htmlFor,
  required = false,
  children,
  className = "",
  icon,
}) {
  return (
    <motion.div
      className={`relative mb-6 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label htmlFor={htmlFor} className="block text-gray-700 font-medium mb-2 transition-colors duration-200">
        {label} {required && <span className="text-orange-500">*</span>}
      </label>
      <div className="relative group">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors duration-200">
            {icon}
          </div>
        )}
        {children}
      </div>
    </motion.div>
  )
}
