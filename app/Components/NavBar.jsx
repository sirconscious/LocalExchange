// "use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";

// import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
// import { CiSquarePlus } from "react-icons/ci";
// import { GrFavorite } from "react-icons/gr";
// import { LuMessageCircle } from "react-icons/lu";
// import { CgProfile } from "react-icons/cg";
// import Filter from "./Filter";

// export default function NavBar() {
//   const [click, handleFocus] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <>
//       <nav className="bg-white shadow-lg">
//         <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
//           {/* Logo */}
//           <a href="#" className="flex items-center space-x-3">
//             <Image src="/logo2.png" alt="Logo" width={160} height={100} unoptimized />
//           </a>

//           {/* Search Bar (always visible) */}
//           <div
//             className={`relative transition-all duration-300 ease-in-out ${
//               click ? "w-[300px]" : "w-[200px]"
//             }`}
//             onMouseLeave={() => handleFocus(false)}
//             onClick={() => handleFocus(true)}
//           >
//             <input
//               type="text"
//               className="block w-full py-3 px-4 text-sm text-black border-none outline-0 rounded-lg bg-gray-200 focus:ring-gray-500"
//               placeholder="Rechercher sur LocalExchanges"
//             />
//             <div className="absolute inset-y-0 end-2 flex items-center pointer-events-none">
//               <FaSearch className="w-4 h-5 text-orange-500 font-bold" />
//             </div>
//           </div>

//           {/* Burger Menu (Small Screens) */}
//           <button
//             className="md:hidden text-gray-600 text-2xl p-2"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             {menuOpen ? <FaTimes /> : <FaBars />}
//           </button>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center space-x-6">
//             <Link href="/login">
//               <button className="bg-[#FF6E14] hover:opacity-85 transition-all text-white p-2 px-4 font-bold rounded-2xl flex items-center space-x-3">
//                 <CiSquarePlus className="text-2xl font-extrabold" />
//                 Déposer une annonce
//               </button>
//             </Link>

//             <ul className="flex space-x-6">
//               <li>
//                 <a href="#" className="flex flex-col items-center group relative">
//                   <GrFavorite className="text-2xl" />
//                   <span className="mt-1">Favoris</span>
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="flex flex-col items-center group relative">
//                   <LuMessageCircle className="text-2xl" />
//                   <span className="mt-1">Message</span>
//                 </a>
//               </li>
//               <li>
//                 <a href="/login" className="flex flex-col items-center group relative">
//                   <CgProfile className="text-2xl" />
//                   <span className="mt-1">Se connecter</span>
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Mobile Menu (Dropdown) */}
//         {menuOpen && (
//           <div className="md:hidden flex flex-col items-center space-y-4 p-4 bg-white border-t shadow-lg">
//             <Link href="/login">
//               <button className="bg-[#FF6E14] hover:opacity-85 transition-all text-white p-2 px-4 font-bold rounded-2xl flex items-center space-x-3">
//                 <CiSquarePlus className="text-2xl font-extrabold" />
//                 Déposer une annonce
//               </button>
//             </Link>

//             <a href="#" className="flex items-center space-x-2">
//               <GrFavorite className="text-2xl" />
//               <span>Favoris</span>
//             </a>

//             <a href="#" className="flex items-center space-x-2">
//               <LuMessageCircle className="text-2xl" />
//               <span>Message</span>
//             </a>

//             <a href="#" className="flex items-center space-x-2">
//               <CgProfile className="text-2xl" />
//               <span>Se connecter</span>
//             </a>
//           </div>
//         )}
//       </nav>

//       {/* Filter (Hidden on Small Screens) */}
//       <div className="hidden md:block">
//         <Filter />
//       </div>
//     </>
//   );
// }
"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Menu, X, Heart, MessageCircle, User, Plus } from "lucide-react"
import Filter from "./Filter"

export default function NavBar() {
  const [searchFocused, setSearchFocused] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-white py-4"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/logo2.png" alt="LocalExchange" width={140} height={50} unoptimized className="h-10 w-auto" />
          </Link>

          {/* Search Bar */}
          <div
            className={`relative hidden md:block transition-all duration-300 ${
              searchFocused ? "w-[400px]" : "w-[300px]"
            }`}
          >
            <div className="relative">
              <input
                type="text"
                className="w-full py-2.5 pl-10 pr-4 text-sm text-gray-700 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-300 focus:bg-white transition-all"
                placeholder="Rechercher sur LocalExchange"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 p-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/login">
              <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-full font-medium flex items-center space-x-2 transition-all duration-300 shadow-sm hover:shadow-md">
                <Plus size={18} />
                <span>Déposer une annonce</span>
              </button>
            </Link>

            <nav className="flex items-center space-x-6">
              <Link href="#" className="nav-link group">
                <div className="flex flex-col items-center">
                  <Heart className="w-5 h-5 text-gray-700 group-hover:text-orange-500 transition-colors" />
                  <span className="mt-1 text-sm text-gray-700 group-hover:text-orange-500 transition-colors">
                    Favoris
                  </span>
                </div>
              </Link>

              <Link href="#" className="nav-link group">
                <div className="flex flex-col items-center">
                  <MessageCircle className="w-5 h-5 text-gray-700 group-hover:text-orange-500 transition-colors" />
                  <span className="mt-1 text-sm text-gray-700 group-hover:text-orange-500 transition-colors">
                    Messages
                  </span>
                </div>
              </Link>

              <Link href="/login" className="nav-link group">
                <div className="flex flex-col items-center">
                  <User className="w-5 h-5 text-gray-700 group-hover:text-orange-500 transition-colors" />
                  <span className="mt-1 text-sm text-gray-700 group-hover:text-orange-500 transition-colors">
                    Se connecter
                  </span>
                </div>
              </Link>
            </nav>
          </div>
        </div>

        {/* Mobile Search - Always visible on mobile */}
        <div className="mt-4 md:hidden">
          <div className="relative">
            <input
              type="text"
              className="w-full py-2.5 pl-10 pr-4 text-sm text-gray-700 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-300 focus:bg-white transition-all"
              placeholder="Rechercher sur LocalExchange"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white border-t border-gray-100 animate-fadeIn">
            <div className="flex flex-col space-y-4">
              <Link href="/login">
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-full font-medium flex items-center justify-center space-x-2 transition-colors">
                  <Plus size={18} />
                  <span>Déposer une annonce</span>
                </button>
              </Link>

              <Link href="#" className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <Heart className="w-5 h-5 text-gray-700" />
                <span className="text-gray-700">Favoris</span>
              </Link>

              <Link href="#" className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <MessageCircle className="w-5 h-5 text-gray-700" />
                <span className="text-gray-700">Messages</span>
              </Link>

              <Link
                href="/login"
                className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <User className="w-5 h-5 text-gray-700" />
                <span className="text-gray-700">Se connecter</span>
              </Link>
            </div>
          </div>
        )}

        {/* Filter - Desktop Only */}
        <div className="hidden md:block mt-4">
          <Filter />
        </div>
      </div>
    </header>
  )
}
