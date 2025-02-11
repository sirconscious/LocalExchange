"use client"
import React from 'react';
import cover from "../assets/cover2.png";  

import { CiSquarePlus } from "react-icons/ci";

export default function HeroSection() {
  return (
    <div
      className="flex justify-center flex-col items-center  p-4 rounded-2xl w-4xl"
      style={{
        backgroundImage: `url(${cover})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <p className="text-2xl p-3 text-white font-bold">C'est le moment pour vendre</p> 
      <button className="bg-[#FF6E14] hover:opacity-85 transition-all  cursor-pointer text-white p-2 px-4 font-bold rounded-2xl flex items-center space-x-3">
        <CiSquarePlus className="text-2xl font-extrabold cursor-pointer" />
        Déposer une annonce
      </button>
    </div>
  );
}
