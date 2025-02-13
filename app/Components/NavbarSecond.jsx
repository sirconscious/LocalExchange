"use client"
import React, { useState } from "react";
import Image from "next/image";
import { CgArrowLeft } from "react-icons/cg";


export default function NavBar() {
  const [click, handleFocus] = useState(false);

  return (
    <>
          <nav className="bg-white  shadow-lg">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-center space-x-4 mx-auto p-4">
       
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
        <CgArrowLeft className="text-orange-600 text-2xl"/>
          {/* <img src="/logo02.png" className="h-10" alt="Logo" />  */}
          <Image src="/logo2.png" alt="Logo" width={160} height={100} unoptimized />

          <span className="self-center text-2xl font-semibold text-black whitespace-nowrap"></span>
        </a>
       </div>
    </nav>
    </>
  );
}
