"use client"
import { useState, useEffect } from "react"
import { useRouter , useParams } from "next/navigation"
import Image from "next/image"
import NavBar from "../../Components/NavBar" 
import Link from "next/link"
import {
  Heart,
  Share2,
  MapPin,
  Clock,
  ShoppingCart,
  ChevronRight,
  Star,
  Shield,
  ArrowLeft,
  ChevronLeft,
  ChevronRightIcon,
} from "lucide-react"
import axios from "axios"
import Cookies from "js-cookie";

export default function ProductDetails(props) { 
  const params = useParams() // Use the `useParams` hook to access params
  const options = { month: 'long', year: 'numeric' };
  const formatter = new Intl.DateTimeFormat('fr-FR', options);

  const id = params?.id // Access the `id` from the unwrapped params
  const router = useRouter()
  const [activeImage, setActiveImage] = useState(0)
  const [showAllSpecs, setShowAllSpecs] = useState(false)
  const [pr, setPr] = useState({})
  const [related, setRelated] = useState([])
  const [isFavorite, setIsFavorite] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [characteristics, setCharacteristics] = useState([])
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const addTocart = async () => {
    try {
      const token = Cookies.get("access_token"); // Retrieve the token from cookies
      const response = await axios.post(
        "http://127.0.0.1:8000/api/cart/add",
        {
          product_id: pr.id,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`, // Use the token from cookies
          },
        }
      );
      console.log("Product added to cart:", response.data);
      setMessage("Produit ajouté au panier"); // Set success message
      setShowMessage(true); // Show the message with animation
      
      setTimeout(() => {
        setShowMessage(false); // Start fade out animation
        setTimeout(() => setMessage(""), 300); // Clear message after animation completes
      }, 3000);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      setMessage("Erreur lors de l'ajout au panier"); // Set error message
      setShowMessage(true); // Show the message with animation
      
      setTimeout(() => {
        setShowMessage(false); // Start fade out animation
        setTimeout(() => setMessage(""), 300); // Clear message after animation completes
      }, 3000);
    }
  };

  useEffect(() => {
    const fetchpr = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get(`http://127.0.0.1:8000/api/product/${id}`) 
        const data = await response.data 
        // console.log(data.data) 
        setPr(data.data) 
        console.log("test" , data.data)
        const response2 = await axios.get(`http://127.0.0.1:8000/api/filterdproducts?categorie=Électronique`)  
        const data2 = await response2.data 
        console.log("test2" , data2.data) 
        setRelated(data2.data)

        // Fetch characteristics
        const response3 = await axios.get(`http://127.0.0.1:8000/api/caracteristique/${id}`)
        const data3 = await response3.data
        // Parse the JSON string from caracteristique field 
        console.log("test3" , data3)
        const parsedCharacteristics = JSON.parse(data3?.caracteristique)  
        console.log("test4" , parsedCharacteristics)
        // console.log("test4" , parsedCharacteristics)
        setCharacteristics(parsedCharacteristics)
      } catch (error) {
        console.error("Error fetching product:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchpr()
  }, [id])

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
    setActiveImage((prev) => (prev + 1) % pr?.image.length)
  }

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + pr?.image.length) % pr?.image.length)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-4">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <button onClick={() => router.push("/")} className="hover:text-orange-500 transition-colors">
                Accueil
              </button>
            </li>
            <li className="flex items-center">
              <ChevronRight className="h-4 w-4 flex-shrink-0 text-gray-400" />
              <button onClick={() => router.push("/product-example")} className="ml-2 hover:text-orange-500 transition-colors">
                {pr?.categorie}
              </button>
            </li>
            <li className="flex items-center">
              <ChevronRight className="h-4 w-4 flex-shrink-0 text-gray-400" />
              <span className="ml-2 text-gray-700 font-medium truncate max-w-[200px]" aria-current="page">
                {pr?.nom}
              </span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Back button (mobile only) */}
      <div className="md:hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <button
          onClick={() => router.push("/product-example")}
          className="flex items-center text-gray-600 hover:text-orange-500 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span className="text-sm">Retour aux résultats</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Product Images */}
            <div className="md:w-3/5 relative">
              {/* Main Image */}
              <div className="relative h-[300px] md:h-[500px] bg-gray-100">
                <Image
                  src={pr?.image[activeImage]?.url || "/placeholder.svg"}
                  alt={pr?.nom}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Image navigation buttons */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all hover:scale-110"
                  aria-label="Image précédente"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-700" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all hover:scale-110"
                  aria-label="Image suivante"
                >
                  <ChevronRightIcon className="h-5 w-5 text-gray-700" />
                </button>

                {/* Image counter */}
                <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
                  {activeImage + 1} / {pr?.image.length}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex p-4 gap-3 overflow-x-auto scrollbar-hide">
                {pr?.image.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImage === index 
                        ? "border-orange-500 ring-2 ring-orange-200" 
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={image.url || "/placeholder.svg"}
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
                  <h1 className="text-2xl font-bold text-gray-800 leading-tight">{pr?.nom}</h1>
                  <div className="mt-3 flex items-center">
                    <span className="text-3xl font-bold text-orange-600">{pr?.prix} €</span>
               
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-2.5 rounded-full border transition-colors ${
                      isFavorite 
                        ? "border-red-200 bg-red-50 text-red-500" 
                        : "border-gray-200 hover:bg-gray-50 text-gray-500"
                    }`}
                    aria-label="Ajouter aux favoris"
                  >
                    <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
                  </button>
                  <button 
                    className="p-2.5 rounded-full border border-gray-200 hover:bg-gray-50 text-gray-500" 
                    aria-label="Partager"
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="mt-4 flex items-center text-sm text-gray-500 space-x-4">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1.5 text-gray-400" />
                  <span>{pr?.localisation}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1.5 text-gray-400" />
                  <span> il y a {(Math.floor((new Date() - new Date(pr?.dateDepot)) / (1000 * 60 * 60 * 24))) > 0 ? (Math.floor((new Date() - new Date(pr?.dateDepot)) / (1000 * 60 * 60 * 24))) +" jours " :
                  (Math.floor((new Date() - new Date(pr?.dateDepot)) / (1000 * 60 * 60 ))) + " heures"
                  }</span>
                </div>
                {/* <div className="flex items-center">
                  <span>{product.views} vues</span>
                </div> */}
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between py-2.5 px-4 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-500">État</span>
                  <span className="text-sm font-medium">{pr?.etat ? pr?.etat : "Comme neuf" } </span>
                </div>
                <div className="flex items-center justify-between py-2.5 px-4 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-500">Catégorie</span>
                  <span className="text-sm font-medium">{pr?.categorie}</span>
                </div>
              </div>

              {/* Seller Info */}
              <div className="mt-6 bg-gray-50 rounded-xl p-5">
                <div className="flex items-center">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-white shadow-md">
                    <Image
                      src={"http://127.0.0.1:8000/storage/"+pr?.owner.image || "/placeholder.svg"}
                      alt={pr?.vendeur}
                      fill
                      className="object-cover"
                    />
                    {product.seller.verified && (
                      <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
                        <Shield className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">{pr?.vendeur}</h3>
                    <div className="flex items-center mt-1 space-x-2">
                      <div className="flex items-center bg-yellow-50 px-2 py-0.5 rounded-full">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs ml-1 font-medium">{product.seller.rating}</span>
                      </div>
                      <span className="text-xs text-gray-500">Membre depuis {formatter.format(new Date(pr?.owner.created_at))}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  {message && (
                    <div 
                      className={`mb-4 px-4 py-3 rounded-lg flex items-center justify-center transition-all duration-300 ease-in-out ${
                        showMessage 
                          ? "opacity-100 transform translate-y-0" 
                          : "opacity-0 transform -translate-y-2"
                      } ${
                        message.includes("Erreur") 
                          ? "bg-red-50 border border-red-100 text-red-600" 
                          : "bg-green-50 border border-green-100 text-green-600"
                      }`}
                    >
                      {message.includes("Erreur") ? (
                        <span className="h-5 w-5 mr-2 text-red-500">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="15" y1="9" x2="9" y2="15"></line>
                            <line x1="9" y1="9" x2="15" y2="15"></line>
                          </svg>
                        </span>
                      ) : (
                        <span className="h-5 w-5 mr-2 text-green-500">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                          </svg>
                        </span>
                      )}
                      <span className="font-medium">{message}</span>
                    </div>
                  )}
                  <button onClick={addTocart} className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3.5 px-4 rounded-xl font-medium transition-colors flex items-center justify-center">
                    <ShoppingCart  className="h-5 w-5 mr-2" />
                    Ajouter au panier
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
                <div className="prose max-w-none text-gray-600 space-y-4">
                  {/* {product.description.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))} */}
                   <p  className="leading-relaxed">
                    {pr?.description}
                    </p>
                </div>
              </div>

              {/* Specifications */}
              <div className="mt-8 md:mt-0 md:w-2/5">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Caractéristiques</h2>
                <div className="bg-gray-50 rounded-xl p-5">
                  <dl className="space-y-4">
                    {characteristics.slice(0, showAllSpecs ? undefined : 4).map((spec, index) => (
                      <div key={spec.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                        <dt className="text-sm text-gray-500">{spec.key}</dt>
                        <dd className="text-sm font-medium text-gray-900">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                  {characteristics.length > 4 && (
                    <button
                      onClick={() => setShowAllSpecs(!showAllSpecs)}
                      className="mt-4 text-sm text-orange-500 hover:text-orange-600 font-medium flex items-center"
                    >
                      {showAllSpecs ? "Voir moins" : "Voir toutes les caractéristiques"}
                      <ChevronRight className={`h-4 w-4 ml-1 transition-transform ${showAllSpecs ? "rotate-90" : ""}`} />
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
              {related.map((relatedProduct) => (
              <Link href={`/products/${relatedProduct.id}`} key={relatedProduct.id}> 
                <div
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="relative h-48">
                    <Image
                      src={relatedProduct?.image[0] || "/categories/h.jpg"}
                      alt={relatedProduct?.nom}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 truncate">{relatedProduct?.nom}</h3>
                    <p className="mt-1 text-orange-600 font-bold">{relatedProduct?.prix} €</p>
                    <div className="mt-2 flex items-center text-xs text-gray-500">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{relatedProduct?.localisation}</span>
                    </div>
                  </div>
                </div>
              </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Safety Tips */}
        {/* <div className="mt-8 bg-orange-50 rounded-xl p-6 border border-orange-100">
          <h2 className="text-lg font-bold text-orange-800 mb-4 flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Conseils de sécurité
          </h2>
          <ul className="space-y-3 text-sm text-orange-700">
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
        </div> */}
      </div>
    </div>
  )
}