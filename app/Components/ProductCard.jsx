"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, MapPin, Clock, Tag } from "lucide-react"

export default function ProductCard({
  id = "1",
  title = "Canapé d'angle convertible gris",
  price = 349.99,
  location = "Lyon, 69003",
  imageUrl = "/images/product-1.jpg",
  category = "Ameublement",
  timePosted = "Il y a 2 heures",
  sellerName = "Marie L.",
  sellerAvatar = "/images/avatar-1.jpg",
  isNew = false,
  isFeatured = false,
}) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const toggleFavorite = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  // Format price to include space as thousand separator and comma for decimal
  const formattedPrice = price.toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })

  return (
    <Link href={`/product/${id}`}>
      <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col border border-gray-200 hover:border-gray-300 hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{
              objectFit: "cover",
              opacity: isImageLoaded ? 1 : 0,
              transition: "opacity 0.3s ease-in-out",
            }}
            onLoad={() => setIsImageLoaded(true)}
            className="group-hover:scale-105 transition-transform duration-500"
          />

          {/* Skeleton loader */}
          {!isImageLoaded && <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>}

          {/* Favorite Button */}
          <button
            onClick={toggleFavorite}
            className={`absolute top-3 right-3 p-2 rounded-full ${
              isFavorite ? "bg-red-500 text-white" : "bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-white"
            } transition-all duration-300 shadow-sm z-10`}
            aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? "fill-white" : "fill-transparent"}`} />
          </button>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {isNew && (
              <span className="bg-green-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">Nouveau</span>
            )}
            {isFeatured && (
              <span className="bg-orange-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">Populaire</span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-medium text-gray-800 line-clamp-2 group-hover:text-orange-500 transition-colors">
              {title}
            </h3>
          </div>

          <div className="mt-2">
            <p className="text-xl font-bold text-gray-900">{formattedPrice}</p>
          </div>

          <div className="mt-3 flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0 text-gray-400" />
            <span className="truncate">{location}</span>
          </div>

          <div className="mt-2 flex items-center text-sm text-gray-500">
            <Tag className="w-4 h-4 mr-1 flex-shrink-0 text-gray-400" />
            <span>{category}</span>
          </div>

          <div className="mt-auto pt-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative w-6 h-6 mr-2">
                <Image
                  src={sellerAvatar || "/placeholder.svg"}
                  alt={sellerName}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <span className="text-sm text-gray-600">{sellerName}</span>
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <Clock className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
              <span>{timePosted}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
