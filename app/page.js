'use client';
import React, { useState } from 'react';
import NavBar from './Components/NavBar.jsx';
import HeroSection from './Components/HeroSection.jsx';
import TrendingCard from './Components/TrendingCard.jsx';
import Card from './Components/Card.jsx';
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
    { title: "Vétements", url: '/categories/clothes.jpg' },
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
    if (currentIndex < Categories.length -5) {
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
      <NavBar />
      <div className="flex px-4 sm:px-20 justify-center items-center mt-28">
        <HeroSection />
      </div>
      <div className="p-4 sm:p-10 w-full flex flex-col items-center mt-10">
      <div className='block sm:hidden'><TrendingCard /></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-6xl w-full mt-6">
        <div className='hidden  sm:flex'><TrendingCard /></div>
          {Trending.map((el, i) => (
            <div key={i} className='sm:h-44 md:h-72'>
              <Card title={el.title} url={el.url} />
            </div>
          ))}
        </div>
      </div>

      {/* Top Categories Section */}
      <div className="container mx-auto">
        <div className="py-10 px-4 sm:px-20 bg-blend-color w-full mb-10">
          <h2 className="text-2xl font-semibold mb-6">Top Catégories</h2>
          <div className="relative flex items-center">
            {/* Left Arrow (Hidden on Small Screens) */}
            <button
              onClick={handlePrev}
              className="hidden  absolute left-0 p-3 bg-gray-100 rounded-full shadow-lg z-10 text-black sm:flex items-center justify-center"
              style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
            >
              <AiOutlineLeft size={20} />
            </button>

            {/* Categories Flex Container with Horizontal Scroll */}
            <div className="overflow-x-auto sm:overflow-hidden w-full sm:ml-10 sm:mr-10">
              <div className="flex gap-4 h-full w-max sm:w-full">
                {Categories.slice(currentIndex, currentIndex + 5).map((category, i) => (
                  <div key={i} className='h-32 w-full md:w-40 lg:w-64'>
                    <Card title={category.title} url={category.url} />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Arrow (Hidden on Small Screens) */}
            <button
              onClick={handleNext}
              className="hidden  absolute right-0 p-3 bg-gray-100 text-black rounded-full shadow-lg z-10 sm:flex items-center justify-center"
              style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
            >
              <AiOutlineRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}