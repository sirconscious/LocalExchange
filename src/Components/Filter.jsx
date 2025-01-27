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
            className="cursor-pointer text-lg flex flex-col text-gray-800 justify-center items-center group"
          >
          <GoDotFill className="text-xs text-gray-400" />
            <span>{item.name}</span>
            <span 
              className="block h-[2px] w-0 bg-gray-800 transition-all duration-300 ease-in-out group-hover:w-full mt-1"
            ></span>
          </li>
        ))}
      </ul>
    </div>
  );
}
