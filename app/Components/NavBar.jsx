"use client"
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { FaSearch } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import { GrFavorite } from "react-icons/gr";
import { LuMessageCircle } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import Filter from "./Filter";
export default function NavBar() {
  const [click, handleFocus] = useState(false);

  return (
    <>
          <nav className="bg-white  shadow-lg">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-center space-x-4 mx-auto p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          {/* <img src="/logo02.png" className="h-10" alt="Logo" />  */}
          <Image src="/logo2.png" alt="Logo" width={160} height={100} unoptimized />

          <span className="self-center text-2xl font-semibold text-black whitespace-nowrap"></span>
        </a>
        <Link href="/login">
      <button className="bg-[#FF6E14] hover:opacity-85 transition-all  cursor-pointer text-white p-2 px-4 font-bold rounded-2xl flex items-center space-x-3">
        <CiSquarePlus className="text-2xl font-extrabold cursor-pointer" />
        Déposer une annonce
      </button>
      </Link>

        <div
          className={`relative hidden md:block transition-all duration-300  ease-in-out ${
            click ? "w-[400px]" : "w-[200px]"
          }`}
          onMouseLeave={() => handleFocus(false)}
          onClick={() => handleFocus(true)}
        >
          <input
            type="text"
            id="search-navbar"
            className="block w-full py-3 px-4 pe-10 text-sm text-black border-none outline-0 rounded-lg bg-gray-200 focus:ring-gray-500 focus:border-gray-500"
            placeholder="Rechercher sur LocalExchanges"
          />

          <div className="absolute inset-y-0 end-2 text-center flex items-center border-none pointer-events-none">
            <FaSearch className="w-4 h-5 text-orange-500 font-bold" />
          </div>
        </div>

        <div className="flex md:order-2">
          <button
            type="button"
            data-collapse-toggle="navbar-search"
            aria-controls="navbar-search"
            aria-expanded="false"
            className="md:hidden text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg text-sm p-2.5 me-1"
          >
            <span className="sr-only">Search</span>
          </button>
        </div>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-search"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-white md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-800 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-700 md:p-0"
                aria-current="page"
              >
                <div className="flex flex-col items-center justify-center group relative">
                  <GrFavorite className="text-2xl" />
                  <span className="mt-1">Favoris</span>
                  <span className="absolute -bottom-1 left-0 right-0 h-1 bg-orange-500 rounded-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                </div>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-800 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-700 md:p-0"
              >
                <div className="flex flex-col items-center justify-center group relative">
                  <LuMessageCircle className="text-2xl" />
                  <span className="mt-1">Message</span>
                  <span className="absolute -bottom-1 left-0 right-0 h-1 bg-orange-500 rounded-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                </div>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-800 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-700 md:p-0"
              >
                <div className="flex flex-col items-center justify-center group relative">
                  <CgProfile className="text-2xl" />
                  <span className="mt-1">Se connecter</span>
                  <span className="absolute -bottom-1 left-0 right-0 h-1 bg-orange-500 rounded-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                </div>
              </a>
            </li>
          </ul>
      
        </div>
       
      </div>
      <Filter/>
    </nav>
    </>
  );
}
