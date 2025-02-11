"use client"
import React, { useState } from 'react';

import HeroSection from './Components/HeroSection';
import TrendingCard from './Components/TrendingCard';
import Card from './Components/Card';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
export default function Home() {
  const Trending = [
    { title: "sport", url: '/trending/sport.jpg' },
    { title: "books", url: '/trending/books.jpg' },
    { title: "home", url: '/trending/home.jpg' },
    { title: "pc", url: '/trending/pc.jpg' }
  ];

  const Categories = [
    { title: "Astuces Maison", url: '/categories/home.jpg' },
    { title: "Offres d'emploi", url: '/categories/stock.jpg' },
    { title: "Vétments", url: '/categories/clothes.jpg' },
    { title: "Voitures", url: '/categories/car.jpg' },
    { title: "Ameublement", url: '/categories/furniture.jpg' },
    { title: "Électronique", url: '/categories/tools.jpg' },
  
    { title: "books", url: '/trending/books.jpg' },
    { title: "home", url: '/trending/home.jpg' },
    { title: "pc", url: '/trending/pc.jpg' },
    { title: "sport", url: '/trending/sport.jpg' }
    
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < Categories.length - 4) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div>
      <div className="w-full flex justify-center items-center mt-28">
        <HeroSection />
      </div>
      <div className="p-10 w-full flex flex-col items-center mt-10">
 
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl h-72 w-full mt-6">
  <TrendingCard />
    {Trending.map((el, i) => (
      <Card key={i} title={el.title} url={el.url} />
    ))}
  </div>
</div>

      
<div className="container mx-auto">
<div className="p-20 bg-blend-color w-full mt-10">
        <h2 className="text-2xl font-semibold mb-6">Top Catégories</h2>
        <div className="relative flex items-center">
          <button 
            onClick={handlePrev} 
            className="absolute hover:cursor-pointer  left-0 p-3 bg-gray-100 rounded-full shadow-lg z-10 text-black flex items-center justify-center"
            style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
          >
            <AiOutlineLeft size={20} />
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 h-40 overflow-hidden w-full ml-10 mr-10">
            {Categories.slice(currentIndex, currentIndex + 4).map((category, i) => (
              <Card key={i} title={category.title} url={category.url} />
            ))}
          </div>
          <button 
            onClick={handleNext} 
            className="absolute hover:cursor-pointer  right-0 p-3 bg-gray-100 text-black rounded-full shadow-lg z-10 flex items-center justify-center"
            style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
          >
            <AiOutlineRight size={20} />
          </button>
        </div>
      </div>

</div>
      {/* Top Categories Section */}
    </div>
    
  );
}
