"use client"
import Link from "next/link"
import { PlusSquare } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Cookies from 'js-cookie'

export default function HeroSection() {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = Cookies.get('access_token')
        if (!token) return

        const response = await fetch('http://127.0.0.1:8000/api/user', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        })

        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
        }
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }

    fetchUser()
  }, [])

  const handleDeposerAnnonce = () => {
    if (user) {
      router.push('/products/add')
    } else {
      router.push('/login')
    }
  }

  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg">
      {/* Background Image */}
      <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] relative">
        <Image
          src="/cover2.png"
          alt="LocalExchange Marketplace"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-start p-8 sm:p-12 md:p-16 max-w-2xl">
        <div className="inline-block px-4 py-1 bg-orange-500 bg-opacity-90 rounded-full text-white text-sm font-medium mb-4 animate-pulse">
          Nouveau sur LocalExchange
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
          C'est le moment <span className="text-orange-400">pour vendre</span>
        </h1>
        <p className="text-white/90 text-lg mb-8 max-w-md">
          Vendez facilement vos objets inutilisés et trouvez des trésors près de chez vous avec LocalExchange.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={handleDeposerAnnonce}
            className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-full font-bold flex items-center space-x-3 transform transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <PlusSquare className="mr-2" />
            Déposer une annonce
          </button>
          <Link href="/signup">
            <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/30 py-3 px-6 rounded-full font-bold flex items-center space-x-3 transform transition-all duration-300 hover:scale-105">
              Découvrir comment ça marche
            </button>
          </Link>
        </div>
      </div>

      {/* Floating Cards */}
      <div className="hidden lg:block absolute -bottom-6 right-12 bg-white rounded-lg shadow-lg p-3 transform rotate-6 animate-float">
        <Image src="/categories/books.jpg" alt="Product" width={100} height={100} className="rounded" />
      </div>
      <div className="hidden lg:block absolute -bottom-6 right-32 bg-white rounded-lg shadow-lg p-3 transform -rotate-3 animate-float-delayed">
        <Image src="/categories/h.jpg" alt="Product" width={100} height={100} className="rounded" />
      </div>
    </div>
  )
}
