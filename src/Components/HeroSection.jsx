import React from 'react';
import cover from "../assets/cover.png";
import { CiSquarePlus } from "react-icons/ci";

export default function HeroSection() {
  return (
    <div
      className="flex justify-center flex-col items-center h-fit p-4 rounded-2xl  w-1/2 bg-linear-65 from-[#FF6E14] to-pink-500"
    
    >
      <p className='text-2xl p-3 text-white'>C'est le moment pour vendre</p> 
      <button className="bg-[#FF6E14] text-white p-2 px-4 font-bold rounded-2xl flex items-center space-x-3">
        <CiSquarePlus className="text-2xl font-extrabold cursor-pointer" />
        Déposer une annonce
      </button>
    </div>
  );
}
