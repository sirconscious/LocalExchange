"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Search, User, Heart, Bell, LogOut, UserCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import Cookies from 'js-cookie'

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const [user, setUser] = useState(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const router = useRouter()
 const [profileI , setProfileI] = useState(null)
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
          setProfileI(data.Profile_image)
          console.log("test" , data)
          setUser(data.user)
        }
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }

    fetchUser()
  }, [])

  const handleLogout = async () => {
    try {
      const token = Cookies.get('access_token')
      if (token) {
        await fetch('http://127.0.0.1:8000/api/logout', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        })
      }
    } catch (error) {
      console.error('Error during logout:', error)
    } finally {
      Cookies.remove('access_token')
      setUser(null)
      router.push('/login')
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        scrolled 
          ? "bg-white/95 shadow-md backdrop-blur-md py-3" 
          : "bg-white/90 backdrop-blur-sm py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-xl mr-2 group-hover:scale-105 transition-transform">
                LE
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent group-hover:text-opacity-80 transition-all">
                LocalExchange
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <Link href="/" className="text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200 relative group">
              Accueil
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/products"
              className="text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200 relative group"
            >
              Produits
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200 relative group"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200 relative group"
            >
              À propos
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className={`hidden md:block relative transition-all duration-300 ${searchFocused ? "w-80" : "w-64"}`}>
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full py-2 pl-10 pr-4 rounded-full bg-gray-100 focus:bg-white border border-transparent focus:border-orange-300 focus:ring-2 focus:ring-orange-200 outline-none transition-all shadow-sm focus:shadow-md"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Desktop Action Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-gray-600 hover:text-orange-500 transition-colors duration-200 hover:scale-110">
              <Heart className="h-6 w-6" />
            </button>
            <button className="text-gray-600 hover:text-orange-500 transition-colors duration-200 hover:scale-110">
              <Bell className="h-6 w-6" />
            </button>
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-orange-500 transition-colors duration-200"
                >
                  {user.image ? (
                    <img 
                      src={profileI} 
                      alt={user.name} 
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-6 w-6" />
                  )}
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <Link
                      href="/user/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <UserCircle className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="text-gray-600 hover:text-orange-500 transition-colors duration-200 hover:scale-110">
                <User className="h-6 w-6" />
              </Link>
            )}
            <Link
              href="/products/add"
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Déposer une annonce
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-orange-500 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Search - Always visible on mobile */}
        <div className="mt-4 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full py-2.5 pl-10 pr-4 rounded-full bg-gray-100 border border-transparent focus:border-orange-300 focus:ring-2 focus:ring-orange-200 outline-none shadow-sm"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="pt-2 pb-4 space-y-1 border-t border-gray-200 mt-4">
            <Link
              href="/"
              className="block py-2.5 px-4 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-500 transition-colors duration-200"
            >
              Accueil
            </Link>
            <Link
              href="/product-example"
              className="block py-2.5 px-4 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-500 transition-colors duration-200"
            >
              Produits
            </Link>
            <Link
              href="/contact"
              className="block py-2.5 px-4 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-500 transition-colors duration-200"
            >
              Contact
            </Link>
            <Link
              href="/about"
              className="block py-2.5 px-4 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-500 transition-colors duration-200"
            >
              À propos
            </Link>
          </div>

          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center justify-around">
              <button className="p-2 rounded-full text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition-colors duration-200">
                <Heart className="h-6 w-6" />
              </button>
              <button className="p-2 rounded-full text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition-colors duration-200">
                <Bell className="h-6 w-6" />
              </button>
              {user ? (
                <div className="relative">
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="p-2 rounded-full text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition-colors duration-200"
                  >
                    {user.image ? (
                      <img 
                        src={profileI} 
                        alt={user.name} 
                        className="h-6 w-6 rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-6 w-6" />
                    )}
                  </button>
                  
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <Link
                        href="/user/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <UserCircle className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="p-2 rounded-full text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition-colors duration-200"
                >
                  <User className="h-6 w-6" />
                </Link>
              )}
            </div>
            <div className="mt-4">
              <Link
                href="/products/add"
                className="block text-center bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-medium hover:shadow-md transition-all duration-300"
              >
                Déposer une annonce
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
