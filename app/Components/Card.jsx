"use client"
import React from "react";

const Card = ({ title, url }) => {
  return (
    <div
      className="rounded-2xl hover:opacity-90   transition-all ease-linear cursor-pointer mr-2.5 w-full h-full  relative p-4 flex flex-col justify-end shadow-lg bg-cover bg-center"
      style={{
        backgroundImage: `url(${url})`,
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent rounded-b-2xl"></div>

      {/* Title inside the overlay */}
      <div className="relative z-10 text-white font-bold p-2 text-xl leading-6">
        <p className="mb-1">{title}</p>
      </div>
    </div>
  );
};

export default Card;
