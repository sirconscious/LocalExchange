import React from 'react'
import NavBar from '../Components/NavBar'
import wave from '../assets/wave.svg'
import wave4 from '../assets/wave4.svg'
import HeroSection from '../Components/HeroSection'
export default function Home() {
  return (
    <div>
        <NavBar />
        <div className="w-full flex justify-center items-center mt-28">
        <HeroSection />

        </div>
        <img  className=' absolute bottom-0 w-full'  src={wave4} alt="" />
    </div>
  )
}
