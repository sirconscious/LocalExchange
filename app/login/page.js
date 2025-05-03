"use client"
import { useState, useEffect } from "react"
import NavBar from "../Components/NavbarSecond"
import Link from "next/link"
import Cookies from "js-cookie"
import ClientAxios from "../server/AxiosClient"
import { Mail, Lock, Eye, EyeOff, AlertCircle, LogIn } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [animateIn, setAnimateIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Trigger entrance animation
    setAnimateIn(true)
  }, [])

  const handleChange = (e) => {
    const { value, name } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    // Clear errors when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({}) // Clear previous errors

    try {
      const res = await ClientAxios.post("api/login", formData)
      
      if (res.data && res.data.token) {
        // Set cookies and auth headers
        Cookies.set("access_token", res.data.token, {
          expires: rememberMe ? 30 : 1, // 30 days if remember me is checked, 1 day otherwise
        })
        ClientAxios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`

        // Redirect to home page after successful login
        router.push("/")
        return // Exit the function after successful login
      } else {
        throw new Error("Invalid response from server")
      }
    } catch (err) {
      console.error("Login error:", err)
      
      // Handle different types of errors
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors)
      } else if (err.response?.data?.message) {
        setErrors({ general: err.response.data.message })
      } else if (err.response?.status === 401) {
        setErrors({ general: "Email ou mot de passe incorrect" })
      } else if (err.response?.status === 403) {
        setErrors({ general: "Accès refusé. Veuillez vérifier vos identifiants." })
      } else if (err.response?.status === 429) {
        setErrors({ general: "Trop de tentatives. Veuillez réessayer plus tard." })
      } else {
        setErrors({ general: "Une erreur s'est produite. Veuillez réessayer." })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b mt-14 from-gray-50 to-gray-100">
      <NavBar />

      <div
        className={`py-10 px-4 sm:px-6 md:py-12 transition-all duration-700 transform ${animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="max-w-md mx-auto">
          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-8 text-white text-center">
              <h1 className="text-2xl font-bold">Bienvenue sur LocalExchange</h1>
              <p className="mt-2 opacity-90">Connectez-vous à votre compte</p>
            </div>

            {/* Form Body */}
            <div className="p-6 sm:p-8">
              {/* General error message */}
              {errors.general && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-600 rounded-lg p-4 flex items-start">
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <p>{errors.general}</p>
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Email Field */}
                <div className="space-y-1">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    E-mail <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      onChange={handleChange}
                      required
                      placeholder="exemple@email.com"
                      className={`w-full rounded-lg border ${errors.email ? "border-red-300 bg-red-50" : "border-gray-300"} pl-10 pr-4 py-3 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-colors`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm flex items-center mt-1">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Mot de passe <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      required
                      onChange={handleChange}
                      placeholder="••••••••"
                      className={`w-full rounded-lg border ${errors.password ? "border-red-300 bg-red-50" : "border-gray-300"} pl-10 pr-10 py-3 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-colors`}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm flex items-center mt-1">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                      className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Se souvenir de moi
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link
                      href="/forgot-password"
                      className="font-medium text-orange-500 hover:text-orange-600 transition-colors"
                    >
                      Mot de passe oublié ?
                    </Link>
                  </div>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3.5 text-center font-semibold text-white hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-300 shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center mt-8 group"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Connexion en cours...
                    </>
                  ) : (
                    <>
                      Se connecter
                      <LogIn className="ml-2 h-5 w-5 transform transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-4 text-sm text-gray-500">Pas encore de compte ?</span>
                </div>
              </div>

              {/* Register Button */}
              <Link href="/signup" className="block">
                <button
                  type="button"
                  className="w-full rounded-lg bg-white border border-orange-500 px-4 py-3 text-center font-semibold text-orange-500 hover:bg-orange-50 focus:outline-none transition-colors"
                >
                  Créer un compte
                </button>
              </Link>
            </div>
          </div>

          {/* Additional information */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              En vous connectant, vous acceptez nos{" "}
              <Link href="/terms" className="text-orange-500 hover:text-orange-600 font-medium">
                conditions d'utilisation
              </Link>{" "}
              et notre{" "}
              <Link href="/privacy" className="text-orange-500 hover:text-orange-600 font-medium">
                politique de confidentialité
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
