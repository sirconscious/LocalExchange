import React from 'react';
import logo from "../assets/logo.png";
import { FaSearch } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";

export default function NavBar() {
  return (
    <nav className="bg-white border-gray-200 border-b-2  shadow-lg ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-evenly mx-auto p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-8" alt="Logo" />
          <span className="self-center text-2xl font-semibold text-black whitespace-nowrap">
            
          </span>
        </a>
        <button className='bg-[#FF6E14] text-white p-2 rounded-2xl flex items-center space-x-3'>
            <CiSquarePlus className=' text-2xl font-extrabold  cursor-pointer' />
            Deposer une annonce
        </button>
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
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <FaSearch className="w-5 h-5 text-[#FF6E14]" />
            </div>
            <input
              type="text"
              id="search-navbar"
              className="block w-full p-2 ps-10 text-sm text-black border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500"
              placeholder="Search..."
            />
          </div>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-search"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-white md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-black rounded-sm md:bg-transparent md:text-black md:p-0"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-500 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-700 md:p-0"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-500 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-700 md:p-0"
              >
                Services
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
