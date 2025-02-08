import React from "react";
import { FaHotjar } from "react-icons/fa";
const TrendingCard = () => {
  return (
    <div
      className="rounded-2xl mr-2.5 w-full  relative p-4 flex flex-col justify-between shadow-lg"
      style={{
        background:
          "linear-gradient(160deg, rgba(247, 215, 212, 1) 0%, rgba(236, 90, 19, 0.1) 50%, rgba(255, 238, 204, 1) 100%)",
      }}
    >
      <div className="text-black p-2 font-bold text-2xl leading-8">
        <p className="mb-1">Tendance en ce moment</p>
        <span><FaHotjar/></span>
      </div>
     
    </div>
  );
};

export default TrendingCard;
