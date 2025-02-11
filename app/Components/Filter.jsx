"use client"
import React from 'react';
import filterData from '../data';
import { GoDotFill } from "react-icons/go";

export default function Filter() {
  return (
    <div className="container w-full mx-auto pb-2">
      <ul className="flex justify-center space-x-16">
        {filterData.map((item, index) => (
          <li 
            key={index} 
            className="cursor-pointer hover:text-black transition-all ease-linear hover:underline  text-lg flex flex-row text-gray-800 justify-center items-center group"
          >
          <GoDotFill className="text-xs text-gray-400 mr-2" />
            <span>{item.name}</span>
           
          </li>
          
        ))}
      </ul>
    </div>
  );
}
