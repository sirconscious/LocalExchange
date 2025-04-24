"use client"
import NavBar from "../Components/NavBar"
import ProductCard from "../Components/ProductCard"

export default function ProductExample() {
  const products = [
    {
      id: "1",
      title: "Canapé d'angle convertible gris",
      price: 349.99,
      location: "Lyon, 69003",
      imageUrl: "/categories/h.jpg",
      category: "Tetouan",
      timePosted: "Il y a 2 heures",
      sellerName: "Marie L.",
      sellerAvatar: "/images/man.png",
      isNew: true,
      isFeatured: false,
    },
    {
      id: "2",
      title: "iPhone 13 Pro Max - 256Go - Très bon état",
      price: 699,
      location: "Casa, 75011",
      imageUrl: "/categories/2148849223.jpg",
      category: "Électronique",
      timePosted: "Il y a 1 jour",
      sellerName: "Thomas D.",
      sellerAvatar: "/images/gamer.png",
      isNew: false,
      isFeatured: true,
    },
    {
      id: "3",
      title: "Vélo de route Decathlon Triban RC520 - Taille M",
      price: 450,
      location: "Marrakech, 13008",
      imageUrl: "/categories/furniture.jpg",
      category: "Sport",
      timePosted: "Il y a 3 jours",
      sellerName: "Sophie M.",
      sellerAvatar: "/images/boy.png",
      isNew: false,
      isFeatured: false,
    },
    {
      id: "4",
      title: "Vélo de route Decathlon Triban RC520 - Taille M",
      price: 450,
      location: "Marrakech, 13008",
      imageUrl: "/categories/accessoriesy.jpg",
      category: "Sport",
      timePosted: "Il y a 3 jours",
      sellerName: "Sophie M.",
      sellerAvatar: "/images/gamer.png",
      isNew: false,
      isFeatured: false,
    },
    {
      id: "5",
      title: "Vélo de route Decathlon Triban RC520 - Taille M",
      price: 450,
      location: "Marrakech, 13008",
      imageUrl: "/categories/pc.jpg",
      category: "Sport",
      timePosted: "Il y a 3 jours",
      sellerName: "Sophie M.",
      sellerAvatar: "/images/man.png",
      isNew: false,
      isFeatured: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Exemples de produits</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  )
}
