// "use client"
// import React from "react";

// const Card = ({ title, url }) => {
//   return (
//     <div
//       className="rounded-2xl hover:opacity-90   transition-all ease-linear cursor-pointer mr-2.5 w-full h-full  relative p-4 flex flex-col justify-end shadow-lg bg-cover bg-center"
//       style={{
//         backgroundImage: `url(${url})`,
//       }}
//     >
//       {/* Overlay for better text readability */}
//       <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent rounded-b-2xl"></div>

//       {/* Title inside the overlay */}
//       <div className="relative z-10 text-white font-bold p-2 text-xl leading-6">
//         <p className="mb-1">{title}</p>
//       </div>
//     </div>
//   );
// };

// export default Card;
"use client"

const Card = ({ title, url }) => {
  return (
    <div
      className="rounded-xl overflow-hidden w-full h-full relative group shadow-md"
      style={{
        backgroundImage: `url(${url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay that gets darker on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

      {/* Title with improved positioning and styling */}
      <div className="absolute bottom-0 left-0 right-0 p-4 transform group-hover:translate-y-[-5px] transition-transform duration-300">
        <h3 className="text-white font-bold text-lg md:text-xl capitalize">{title}</h3>
        <div className="w-10 h-1 bg-orange-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </div>
  )
}

export default Card
