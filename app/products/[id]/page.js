"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import NavBar from "../../Components/NavBar"
import {
  Heart,
  Share2,
  MapPin,
  Clock,
  MessageCircle,
  ChevronRight,
  Star,
  Shield,
  ArrowLeft,
  ChevronLeft,
  ChevronRightIcon,
} from "lucide-react"

export default function ProductDetails() {
  const router = useRouter()
  const [activeImage, setActiveImage] = useState(0)
  const [showAllSpecs, setShowAllSpecs] = useState(false)

  // Sample product data
  const product = {
    id: "p123456",
    title: "Canapé d'angle convertible en tissu - Gris clair",
    price: 649.99,
    originalPrice: 799.99,
    discount: 19,
    location: "Casablanca, Maarif",
    postedDate: "Il y a 2 jours",
    views: 243,
    condition: "Comme neuf",
    category: "Ameublement",
    description: `Ce canapé d'angle convertible est parfait pour votre salon ou votre salle de séjour. Avec son design élégant et contemporain, il s'intègre parfaitement dans tous les intérieurs.

Le canapé est convertible en lit, ce qui en fait un meuble polyvalent idéal pour les invités. Le tissu est de haute qualité, doux au toucher et facile à nettoyer.

Le canapé est vendu avec tous les coussins visibles sur les photos. La livraison peut être organisée moyennant des frais supplémentaires.`,
    specifications: [
      { name: "Dimensions", value: "L 250 cm x P 180 cm x H 85 cm" },
      { name: "Matériau", value: "Tissu polyester" },
      { name: "Couleur", value: "Gris clair" },
      { name: "Convertible", value: "Oui" },
      { name: "Nombre de places", value: "4-5 personnes" },
      { name: "Pieds", value: "Bois naturel" },
      { name: "Entretien", value: "Housse déhoussable et lavable" },
      { name: "Garantie", value: "Aucune (produit d'occasion)" },
    ],
    images: ["/categories/2148849223.jpg", "/categories/books.jpg", "/categories/car.jpg", "/categories/caraccessories.jpg"],
    seller: {
      id: "s789012",
      name: "Mark M.",
      memberSince: "Avril 2022",
      responseRate: 98,
      responseTime: "En général moins d'une heure",
      rating: 4.8,
      reviews: 47,
      avatar: "/images/man.png",
      verified: true,
    },
    relatedProducts: [
      {
        id: "rp1",
        title: "Table basse en bois massif",
        price: 189.99,
        location: "Rabat",
        image: "/categories/books.jpg",
      },
      {
        id: "rp2",
        title: "Fauteuil scandinave gris",
        price: 149.99,
        location: "Casablanca",
        image: "/categories/books.jpg",
      },
      {
        id: "rp3",
        title: "Lampadaire design moderne",
        price: 79.99,
        location: "Marrakech",
        image: "/categories/books.jpg",
      },
    ],
  }

  // Handle image navigation
  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-4">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <button onClick={() => router.push("/")} className="hover:text-orange-500">
                Accueil
              </button>
            </li>
            <li className="flex items-center">
              <ChevronRight className="h-4 w-4 flex-shrink-0 text-gray-400" />
              <button onClick={() => router.push("/product-example")} className="ml-2 hover:text-orange-500">
                {product.category}
              </button>
            </li>
            <li className="flex items-center">
              <ChevronRight className="h-4 w-4 flex-shrink-0 text-gray-400" />
              <span className="ml-2 text-gray-700 font-medium truncate max-w-[200px]" aria-current="page">
                {product.title}
              </span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Back button (mobile only) */}
      <div className="md:hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <button
          onClick={() => router.push("/product-example")}
          className="flex items-center text-gray-600 hover:text-orange-500"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span className="text-sm">Retour aux résultats</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="md:flex">
            {/* Product Images */}
            <div className="md:w-3/5 relative">
              {/* Main Image */}
              <div className="relative h-[300px] md:h-[500px] bg-gray-100">
                <Image
                  src={product.images[activeImage] || "/placeholder.svg"}
                  alt={product.title}
                  fill
                  className="object-cover"
                />

                {/* Image navigation buttons */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
                  aria-label="Image précédente"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-700" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
                  aria-label="Image suivante"
                >
                  <ChevronRightIcon className="h-5 w-5 text-gray-700" />
                </button>

                {/* Image counter */}
                <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded-md">
                  {activeImage + 1} / {product.images.length}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex p-2 gap-2 overflow-x-auto scrollbar-hide">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all ${
                      activeImage === index ? "border-orange-500" : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="md:w-2/5 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>
                  <div className="mt-2 flex items-center">
                    <span className="text-2xl font-bold text-orange-600">{product.price.toFixed(2)} €</span>
                    {product.originalPrice && (
                      <>
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          {product.originalPrice.toFixed(2)} €
                        </span>
                        <span className="ml-2 text-xs font-medium bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded">
                          -{product.discount}%
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="p-2 rounded-full border border-gray-200 hover:bg-gray-50"
                    aria-label="Ajouter aux favoris"
                  >
                    <Heart className="h-5 w-5 text-gray-500" />
                  </button>
                  <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-50" aria-label="Partager">
                    <Share2 className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="mt-4 flex items-center text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                <span>{product.location}</span>
                <span className="mx-2">•</span>
                <Clock className="h-4 w-4 mr-1 text-gray-400" />
                <span>{product.postedDate}</span>
                <span className="mx-2">•</span>
                <span>{product.views} vues</span>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-500">État</span>
                  <span className="text-sm font-medium">{product.condition}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Catégorie</span>
                  <span className="text-sm font-medium">{product.category}</span>
                </div>
              </div>

              {/* Seller Info */}
              <div className="mt-6 bg-gray-50 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={product.seller.avatar || "/placeholder.svg"}
                      alt={product.seller.name}
                      fill
                      className="object-cover"
                    />
                    {product.seller.verified && (
                      <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-0.5">
                        <Shield className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">{product.seller.name}</h3>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-400" />
                        <span className="text-xs ml-1">{product.seller.rating}</span>
                      </div>
                      <span className="mx-1 text-gray-300">•</span>
                      <span className="text-xs text-gray-500">Membre depuis {product.seller.memberSince}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                    <MessageCircle className="h-5 w-5 inline mr-2 -mt-1" />
                    Contacter le vendeur
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Product Description and Details */}
          <div className="p-6 border-t border-gray-100">
            <div className="md:flex md:gap-12">
              {/* Description */}
              <div className="md:w-3/5">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Description</h2>
                <div className="prose max-w-none text-gray-600">
                  {product.description.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Specifications */}
              <div className="mt-8 md:mt-0 md:w-2/5">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Caractéristiques</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <dl className="space-y-3">
                    {product.specifications.slice(0, showAllSpecs ? undefined : 4).map((spec, index) => (
                      <div key={index} className="flex justify-between">
                        <dt className="text-sm text-gray-500">{spec.name}</dt>
                        <dd className="text-sm font-medium text-gray-900">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                  {product.specifications.length > 4 && (
                    <button
                      onClick={() => setShowAllSpecs(!showAllSpecs)}
                      className="mt-4 text-sm text-orange-500 hover:text-orange-600 font-medium"
                    >
                      {showAllSpecs ? "Voir moins" : "Voir toutes les caractéristiques"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="p-6 border-t border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Produits similaires</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {product.relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={relatedProduct.image || "/placeholder.svg"}
                      alt={relatedProduct.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 truncate">{relatedProduct.title}</h3>
                    <p className="mt-1 text-orange-600 font-bold">{relatedProduct.price.toFixed(2)} €</p>
                    <div className="mt-2 flex items-center text-xs text-gray-500">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{relatedProduct.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Safety Tips */}
        <div className="mt-8 bg-orange-50 rounded-xl p-6 border border-orange-100">
          <h2 className="text-lg font-bold text-orange-800 mb-4 flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Conseils de sécurité
          </h2>
          <ul className="space-y-2 text-sm text-orange-700">
            <li className="flex items-start">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-orange-500 mt-1.5 mr-2"></span>
              Rencontrez le vendeur dans un lieu public sécurisé
            </li>
            <li className="flex items-start">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-orange-500 mt-1.5 mr-2"></span>
              Vérifiez le produit avant de payer
            </li>
            <li className="flex items-start">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-orange-500 mt-1.5 mr-2"></span>
              Ne payez jamais à l'avance ou par virement bancaire à des inconnus
            </li>
            <li className="flex items-start">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-orange-500 mt-1.5 mr-2"></span>
              Signalez tout comportement suspect à notre équipe
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
