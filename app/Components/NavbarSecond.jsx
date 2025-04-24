"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50  transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-white/95 backdrop-blur-sm py-3 border-b border-gray-200"
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-12">
          {/* Logo and Back Button */}
          <Link
            href="/"
            className="flex items-center space-x-3 group transition-transform duration-300 hover:-translate-x-1"
            aria-label="Retour à l'accueil"
          >
            <div className="p-1.5 rounded-full bg-orange-100 group-hover:bg-orange-200 transition-colors duration-300">
              <ArrowLeft className="text-orange-500 w-5 h-5" />
            </div>
            <div className="relative h-8 w-32">
              <Image
                src="/logo2.png"
                alt="LocalExchange"
                fill
                style={{ objectFit: "contain" }}
                className="object-left"
                priority
              />
            </div>
          </Link>
        </div>
      </div>
    </nav>
  )
}
