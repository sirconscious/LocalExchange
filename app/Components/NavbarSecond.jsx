"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CgArrowLeft } from "react-icons/cg";
import Link from "next/link";
export default function NavBar() {

  return (
    <>
      <nav className="bg-white shadow-md shadow-gray-300 border-b">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-center space-x-4 mx-auto p-4">
    <Link href="/" className="flex items-center  space-x-3 rtl:space-x-reverse">
         
            <CgArrowLeft className="text-orange-600 text-3xl" />
            <Image src="/logo2.png" alt="Logo" width={200} height={200} unoptimized />
            <span className="self-center text-2xl font-semibold text-black whitespace-nowrap"></span>
        
          </Link>
        </div>
      </nav>
    </>
  );
}
