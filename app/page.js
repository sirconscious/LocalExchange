"use client"
import { useState, useEffect } from "react"
import NavBar from "./Components/NavBar"
import HeroSection from "./Components/HeroSection"
import TrendingCard from "./Components/TrendingCard"
import Card from "./Components/Card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

export default function Home() {
  const trending = [
    { title: "Sport", url: "/trending/sport.jpg" },
    { title: "Livres", url: "/trending/books.jpg" },
    { title: "Maison", url: "/trending/home.jpg" },
    { title: "Informatique", url: "/trending/pc.jpg" },
  ]

  const categories = [
    { title: "Astuces Maison", url: "/categories/home.jpg" },
    { title: "Offres d'emploi", url: "/categories/tools.jpg" },
    { title: "Vêtements", url: "/categories/clothes.jpg" },
    { title: "Voitures", url: "/categories/car.jpg" },
    { title: "Ameublement", url: "/categories/furniture.jpg" },
    { title: "Électronique", url: "/categories/h.jpg" },
    { title: "Livres", url: "/categories/books.jpg" },
    { title: "Maison", url: "/categories/home.jpg" },
    { title: "Informatique", url: "/categories/pc.jpg" },
    { title: "Sport", url: "/categories/2148849223.jpg" },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleNext = () => {
    if (currentIndex < categories.length - 5) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  // Stats for the stats section
  const stats = [
    { value: 50000, label: "Utilisateurs actifs" },
    { value: 100000, label: "Annonces publiées" },
    { value: 15000, label: "Transactions par mois" },
    { value: 4.8, label: "Note moyenne" },
  ]
  
  const [animatedStats, setAnimatedStats] = useState(
    stats.map(() => 0) // Initialize all stats to 0
  );

  useEffect(() => {
    const intervals = stats.map((stat, index) => {
      const increment = Math.ceil(stat.value / 100); // Increment value for smooth animation
      return setInterval(() => {
        setAnimatedStats((prev) => {
          const newStats = [...prev];
          if (newStats[index] < stat.value) {
            newStats[index] = Math.min(newStats[index] + increment, stat.value);
          }
          return newStats;
        });
      }, 20); // Update every 20ms
    });

    return () => intervals.forEach(clearInterval); // Cleanup intervals on unmount
  }, [stats]);


  // Testimonials for the testimonials section
  const testimonials = [
    {
      quote:
        "J'ai vendu mon ancien canapé en moins de 24 heures. Le processus était simple et l'acheteur habitait à seulement 10 minutes de chez moi!",
      author: "Marie L.",
      location: "Marrakech",
      avatar: "/images/boy.png",
    },
    {
      quote:
        "LocalExchange m'a permis de trouver des meubles de qualité à petit prix pour mon nouvel appartement. Je recommande vivement!",
      author: "Thomas D.",
      location: "Tetouan",
      avatar: "/images/man.png",
    },
    {
      quote:
        "Une communauté bienveillante et des transactions sécurisées. C'est exactement ce que je cherchais pour vendre mes objets inutilisés.",
      author: "Sophie M.",
      location: "",
      avatar: "/images/gamer.png",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      {/* Hero Section */}
      <div
        className={`container mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-10 transition-all duration-1000 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <HeroSection />
      </div>

      {/* Stats Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">
                {animatedStats[index].toLocaleString()} {/* Format numbers */}
              </div>
              <div className="text-sm md:text-base text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>


      {/* Trending Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-gray-800 border-l-4 border-orange-500 pl-4">
          Tendances
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-1">
            <TrendingCard />
          </div>

          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {trending.map((item, i) => (
              <div key={i} className="h-64 sm:h-56 md:h-64 transition-transform duration-300 hover:scale-105">
                <Card title={item.title} url={item.url} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-r from-orange-50 to-amber-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Comment ça marche</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              LocalExchange simplifie les échanges entre particuliers dans votre région en quelques étapes simples.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-500">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Créez votre annonce</h3>
              <p className="text-gray-600">Prenez quelques photos, ajoutez une description et fixez votre prix.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-500">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Discutez avec les acheteurs</h3>
              <p className="text-gray-600">Échangez en toute sécurité via notre messagerie intégrée.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-500">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Finalisez la vente</h3>
              <p className="text-gray-600">Rencontrez l'acheteur et concluez votre transaction en toute simplicité.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white shadow-sm rounded-lg mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-gray-800 border-l-4 border-orange-500 pl-4">
          Top Catégories
        </h2>

        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="absolute -left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-lg z-10 text-gray-800 hover:bg-gray-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hidden sm:flex items-center justify-center"
            aria-label="Previous categories"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Categories Slider */}
          <div className="overflow-x-auto sm:overflow-hidden scrollbar-hide">
            <div
              className="flex gap-6 transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${currentIndex * (100 / 5)}%)` }}
            >
              {categories.map((category, i) => (
                <div
                  key={i}
                  className="min-w-[200px] sm:min-w-[180px] md:min-w-[220px] h-48 flex-shrink-0 transition-transform duration-300 hover:scale-105"
                >
                  <Card title={category.title} url={category.url} />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex >= categories.length - 5}
            className="absolute -right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-lg z-10 text-gray-800 hover:bg-gray-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hidden sm:flex items-center justify-center"
            aria-label="Next categories"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Mobile Pagination Indicators */}
        <div className="flex justify-center mt-6 gap-2 sm:hidden">
          {Array.from({ length: Math.ceil(categories.length / 2) }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i * 2)}
              className={`w-2 h-2 rounded-full ${i * 2 === currentIndex ? "bg-orange-500" : "bg-gray-300"}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-gray-800 border-l-4 border-orange-500 pl-4">
          Ce que disent nos utilisateurs
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 mr-4">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.author}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{testimonial.author}</h3>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              <div className="mt-4 flex text-orange-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-12">
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl p-8 shadow-md relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">Rejoignez notre communauté locale</h2>
            <p className="text-white text-opacity-90 mb-8">
              Achetez, vendez et échangez avec des personnes de votre région. LocalExchange rend les transactions
              locales simples, sécurisées et conviviales.
            </p>
            <button className="bg-white text-orange-500 hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md">
              Créer un compte gratuitement
            </button>
          </div>
        </div>
      </section>

      {/* App Download Section */}
      {/* <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-12">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">Téléchargez notre application</h2>
              <p className="text-gray-600 mb-6">
                Accédez à LocalExchange où que vous soyez. Notre application mobile vous permet de publier des annonces,
                de discuter avec les acheteurs et de gérer vos transactions en déplacement.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="#" className="transform transition hover:scale-105">
                  <Image src="/images/app-store-badge.png" alt="Download on App Store" width={140} height={42} />
                </Link>
                <Link href="#" className="transform transition hover:scale-105">
                  <Image src="/images/google-play-badge.png" alt="Get it on Google Play" width={140} height={42} />
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="h-64 md:h-full relative">
                <Image
                  src="/images/app-mockup.png"
                  alt="LocalExchange Mobile App"
                  fill
                  style={{ objectFit: "cover" }}
                  className="object-left"
                />
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="mb-4">
                <Image src="/logo2.png"  alt="LocalExchange" width={160} height={40} />
              </div>
              <p className="text-gray-400">La plateforme d'échange local qui connecte votre communauté.</p>
              <div className="mt-4 flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Liens Rapides</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    À propos
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Comment ça marche
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Sécurité
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Nous contacter
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Catégories</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Électronique
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Vêtements
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Maison
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Voitures
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Restez connecté</h3>
              <p className="text-gray-400 mb-4">
                Inscrivez-vous à notre newsletter pour recevoir les dernières annonces.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="px-4 py-2 rounded-l-md w-full focus:outline-none text-gray-800"
                />
                <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-r-md transition-colors">
                  S'inscrire
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} LocalExchange. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
