// "use client"
// import React from "react";
// import { FaHotjar } from "react-icons/fa";
// const TrendingCard = () => {
//   return (
//     <div
//       className="rounded-2xl mr-2.5 w-full  relative p-4 flex flex-col justify-between shadow-lg"
//       style={{
//         background:
//           "linear-gradient(160deg, rgba(247, 215, 212, 1) 0%, rgba(236, 90, 19, 0.1) 50%, rgba(255, 238, 204, 1) 100%)",
//       }}
//     >
//       <div className="text-black p-2 font-bold text-2xl leading-8">
//         <p className="mb-1">Tendance en ce moment</p>
//         <span><FaHotjar/></span>
//       </div>
     
//     </div>
//   );
// };

// export default TrendingCard;
"use client"
import { Flame } from "lucide-react"

const TrendingCard = () => {
  return (
    <div className="rounded-xl overflow-hidden h-full w-full relative group shadow-md bg-gradient-to-br from-orange-50 via-orange-100 to-amber-50 border border-orange-100">
      <div className="absolute top-0 right-0 p-4">
        <div className="bg-orange-500 text-white p-2 rounded-full animate-pulse">
          <Flame size={24} />
        </div>
      </div>

      <div className="p-6 flex flex-col h-full justify-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Tendance en ce moment</h3>
        <p className="text-gray-600 mb-4">Découvrez ce qui est populaire dans votre région</p>
        <button className="mt-auto text-orange-500 font-medium hover:text-orange-600 transition-colors flex items-center">
          Voir tout
          <svg
            className="w-5 h-5 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default TrendingCard
