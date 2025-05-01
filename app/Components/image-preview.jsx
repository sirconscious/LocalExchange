"use client"
import { motion } from "framer-motion"
import { X, ImageIcon, Check } from "lucide-react"

export default function ImagePreview({ images, onRemove }) {
  if (!images || images.length === 0) return null

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  }

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-gray-700 flex items-center">
          <ImageIcon className="h-4 w-4 mr-2 text-orange-500" />
          Photos téléchargées ({images.length}/5)
        </p>
        {images.length > 0 && (
          <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center">
            <Check className="w-3 h-3 mr-1" />
            {images.length} {images.length === 1 ? "photo" : "photos"} prête{images.length > 1 ? "s" : ""}
          </span>
        )}
      </div>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="relative group aspect-square overflow-hidden rounded-lg border border-gray-200 shadow-sm bg-white"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <img
              src={URL.createObjectURL(image) || "/placeholder.svg"}
              alt={`Aperçu ${index + 1}`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-all duration-200">
              <button
                onClick={() => onRemove(index)}
                className="bg-white text-red-500 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-50 transform translate-y-1 group-hover:translate-y-0 shadow-sm"
                aria-label="Supprimer l'image"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
              <p className="text-white text-xs truncate">{image.name}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
