"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import { GrFavorite } from "react-icons/gr";
import { LuMessageCircle } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import Filter from "./Filter";

export default function NavBar() {
  const [click, handleFocus] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-lg">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-3">
            <Image src="/logo2.png" alt="Logo" width={160} height={100} unoptimized />
          </a>

          {/* Search Bar (always visible) */}
          <div
            className={`relative transition-all duration-300 ease-in-out ${
              click ? "w-[300px]" : "w-[200px]"
            }`}
            onMouseLeave={() => handleFocus(false)}
            onClick={() => handleFocus(true)}
          >
            <input
              type="text"
              className="block w-full py-3 px-4 text-sm text-black border-none outline-0 rounded-lg bg-gray-200 focus:ring-gray-500"
              placeholder="Rechercher sur LocalExchanges"
            />
            <div className="absolute inset-y-0 end-2 flex items-center pointer-events-none">
              <FaSearch className="w-4 h-5 text-orange-500 font-bold" />
            </div>
          </div>

          {/* Burger Menu (Small Screens) */}
          <button
            className="md:hidden text-gray-600 text-2xl p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/login">
              <button className="bg-[#FF6E14] hover:opacity-85 transition-all text-white p-2 px-4 font-bold rounded-2xl flex items-center space-x-3">
                <CiSquarePlus className="text-2xl font-extrabold" />
                Déposer une annonce
              </button>
            </Link>

            <ul className="flex space-x-6">
              <li>
                <a href="#" className="flex flex-col items-center group relative">
                  <GrFavorite className="text-2xl" />
                  <span className="mt-1">Favoris</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex flex-col items-center group relative">
                  <LuMessageCircle className="text-2xl" />
                  <span className="mt-1">Message</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex flex-col items-center group relative">
                  <CgProfile className="text-2xl" />
                  <span className="mt-1">Se connecter</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile Menu (Dropdown) */}
        {menuOpen && (
          <div className="md:hidden flex flex-col items-center space-y-4 p-4 bg-white border-t shadow-lg">
            <Link href="/login">
              <button className="bg-[#FF6E14] hover:opacity-85 transition-all text-white p-2 px-4 font-bold rounded-2xl flex items-center space-x-3">
                <CiSquarePlus className="text-2xl font-extrabold" />
                Déposer une annonce
              </button>
            </Link>

            <a href="#" className="flex items-center space-x-2">
              <GrFavorite className="text-2xl" />
              <span>Favoris</span>
            </a>

            <a href="#" className="flex items-center space-x-2">
              <LuMessageCircle className="text-2xl" />
              <span>Message</span>
            </a>

            <a href="#" className="flex items-center space-x-2">
              <CgProfile className="text-2xl" />
              <span>Se connecter</span>
            </a>
          </div>
        )}
      </nav>

      {/* Filter (Hidden on Small Screens) */}
      <div className="hidden md:block">
        <Filter />
      </div>
    </>
  );
}
