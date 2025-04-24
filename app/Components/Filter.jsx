"use client"
import React from 'react';
import filterData from '../data';
import { GoDotFill } from "react-icons/go";

// export default function Filter() {
//   return (
//     <div className="container w-full mx-auto pb-2">
//       <ul className="flex justify-center space-x-16">
//         {filterData.map((item, index) => (
//           <li 
//             key={index} 
//             className="cursor-pointer hover:text-black transition-all ease-linear hover:underline  text-lg flex flex-row text-gray-800 justify-center items-center group"
//           >
//           <GoDotFill className="text-xs text-gray-400 mr-2" />
//             <span>{item.name}</span>
           
//           </li>
          
//         ))}
//       </ul>
//     </div>
//   );
// }
// import filterData from '../data';
export default function Filter() {
  return (
    <div className="w-full py-2">
      <div className="flex justify-center items-center overflow-x-auto scrollbar-hide">
        <ul className="flex space-x-8">
          {filterData.map((item, index) => (
            <li key={index} className="cursor-pointer whitespace-nowrap group">
              <div className="flex items-center space-x-2 py-1 px-2 rounded-full hover:bg-gray-100 transition-all duration-200">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                <span className="text-gray-700 group-hover:text-gray-900 font-medium transition-colors">
                  {item.name}
                </span>
              </div>
              <div className="h-0.5 w-0 bg-orange-500 mt-1 group-hover:w-full transition-all duration-300"></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
