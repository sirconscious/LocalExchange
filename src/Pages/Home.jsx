import React from 'react'
import NavBar from '../Components/NavBar'
import wave from '../assets/wave.svg'
import wave4 from '../assets/wave4.svg'
import HeroSection from '../Components/HeroSection'
import TrendingCard from '../Components/TrendingCard'
import Card from '../Components/Card';

export default function Home() {
  const Tranding=[
    {title:"sport", url:'/trending/sport.jpg'},
    {title:"books", url:'/trending/books.jpg'},
    {title:"home", url:'/trending/home.jpg'},
    {title:"pc", url:'/trending/pc.jpg'}
  ]

  return (
    <div>
        <NavBar />
        <div className="w-full flex justify-center items-center mt-28">
        <HeroSection />
        
        </div>
        <div  className="p-10 w-full flex flex-row justify-center items-center mt-10 ">
          <TrendingCard/>
          <div className='flex flex-row'>
          {
  Tranding.map((el, i) => { return <Card key={i} title={el.title} url={el.url} /> })
}

          </div>
       
              
         </div>
       
    </div>
  )
}