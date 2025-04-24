'use client';
import React, { useState } from 'react';
import NavBar from './Components/NavBar.jsx';
import HeroSection from './Components/HeroSection.jsx';
import TrendingCard from './Components/TrendingCard.jsx';
import Card from './Components/Card.jsx';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Home() {
  const trending = [
    { title: "Sport", url: "/trending/sport.jpg" },
    { title: "Livres", url: "/trending/books.jpg" },
    { title: "Maison", url: "/trending/home.jpg" },
    { title: "Informatique", url: "/trending/pc.jpg" },
  ]

  const categories = [
    { title: "Astuces Maison", url: "/categories/home.jpg" },
    { title: "Offres d'emploi", url: "/categories/stock.jpg" },
    { title: "Vêtements", url: "/categories/clothes.jpg" },
    { title: "Voitures", url: "/categories/car.jpg" },
    { title: "Ameublement", url: "/categories/furniture.jpg" },
    { title: "Électronique", url: "/categories/tools.jpg" },
    { title: "Livres", url: "/trending/books.jpg" },
    { title: "Maison", url: "/trending/home.jpg" },
    { title: "Informatique", url: "/trending/pc.jpg" },
    { title: "Sport", url: "/trending/sport.jpg" },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

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

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      {/* Hero Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-10">
        <HeroSection />
      </div>

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

      {/* Featured Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-12">
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-8 shadow-sm">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">Rejoignez notre communauté locale</h2>
            <p className="text-gray-600 mb-8">
              Achetez, vendez et échangez avec des personnes de votre région. LocalExchange rend les transactions
              locales simples, sécurisées et conviviales.
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md">
              Créer un compte gratuitement
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">LocalExchange</h3>
              <p className="text-gray-400">La plateforme d'échange local qui connecte votre communauté.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Liens Rapides</h3>
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
              <h3 className="text-xl font-bold mb-4">Restez connecté</h3>
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
