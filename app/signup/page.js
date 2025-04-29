"use client"
import { useState, useEffect } from "react"
import NavBar from "./../Components/NavbarSecond"
import ClientAxios from "./../server/AxiosClient"
import Link from "next/link"
import { useRouter } from "next/navigation"
import moroccanCities from "../data/CitysData"
import {
  User,
  Mail,
  Phone,
  Lock,
  MapPin,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowRight,
  UserCircle,
  MapPinned,
  KeyRound,
  CheckSquare,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"

export default function SignUp() {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    city: moroccanCities[0] || "",
    phone: "",
  })

  // UI state
  const router = useRouter()
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formTouched, setFormTouched] = useState(false)
  const [animateIn, setAnimateIn] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)

  // Multi-step form state
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4
  const [stepComplete, setStepComplete] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
  })

  // Step validation rules
  const validateStep = (step) => {
    let isValid = true
    const newErrors = {}

    if (step === 1) {
      if (!formData.name.trim()) {
        newErrors.name = ["Le nom est requis"]
        isValid = false
      }
      if (!formData.email.trim()) {
        newErrors.email = ["L'email est requis"]
        isValid = false
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = ["Format d'email invalide"]
        isValid = false
      }
    } else if (step === 2) {
      if (!formData.phone.trim()) {
        newErrors.phone = ["Le numéro de téléphone est requis"]
        isValid = false
      }
      if (!formData.city) {
        newErrors.city = ["La ville est requise"]
        isValid = false
      }
    } else if (step === 3) {
      if (!formData.password) {
        newErrors.password = ["Le mot de passe est requis"]
        isValid = false
      } else if (formData.password.length < 8) {
        newErrors.password = ["Le mot de passe doit contenir au moins 8 caractères"]
        isValid = false
      }
      if (formData.password !== formData.password_confirmation) {
        newErrors.password_confirmation = ["Les mots de passe ne correspondent pas"]
        isValid = false
      }
    } else if (step === 4) {
      if (!agreeToTerms) {
        newErrors.terms = ["Vous devez accepter les conditions d'utilisation"]
        isValid = false
      }
    }

    setErrors(newErrors)
    return isValid
  }

  // Handle next step
  const handleNextStep = () => {
    const isStepValid = validateStep(currentStep)

    if (isStepValid) {
      setStepComplete({
        ...stepComplete,
        [currentStep]: true,
      })

      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1)
      }
    }
  }

  // Handle previous step
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Go to specific step (only if previous steps are complete)
  const goToStep = (step) => {
    if (step < currentStep || stepComplete[step - 1]) {
      setCurrentStep(step)
    }
  }

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
    setErrors({
      ...errors,
      [name]: null,
    })
    setFormTouched(true)

    // Calculate password strength if the password field is being updated
    if (name === "password") {
      calculatePasswordStrength(value)
    }
  }

  const calculatePasswordStrength = (password) => {
    let strength = 0

    if (password.length >= 8) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1

    setPasswordStrength(strength)
  }

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return ""
    if (passwordStrength === 1) return "Faible"
    if (passwordStrength === 2) return "Moyen"
    if (passwordStrength === 3) return "Bon"
    if (passwordStrength === 4) return "Excellent"
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return "bg-gray-200"
    if (passwordStrength === 1) return "bg-red-500"
    if (passwordStrength === 2) return "bg-orange-500"
    if (passwordStrength === 3) return "bg-yellow-500"
    if (passwordStrength === 4) return "bg-green-500"
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate final step
    const isValid = validateStep(currentStep)
    if (!isValid) return

    setIsSubmitting(true)

    try {
      const res = await ClientAxios.post("api/register", formData)
      console.log(res.data)
      setErrors({})

      // Show success message with animation before redirecting
      setTimeout(() => {
        router.push("/login")
      }, 1500)
    } catch (err) {
      if (err.response && err.response.data.errors) {
        setErrors(err.response.data.errors)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // Step indicators
  const StepIndicator = ({ currentStep, totalSteps, stepComplete }) => {
    return (
      <div className="flex items-center justify-center mb-8">
        {[...Array(totalSteps)].map((_, index) => {
          const stepNumber = index + 1
          const isActive = stepNumber === currentStep
          const isCompleted = stepComplete[stepNumber] || stepNumber < currentStep

          return (
            <div key={stepNumber} className="flex items-center">
              {/* Step circle */}
              <button
                onClick={() => goToStep(stepNumber)}
                disabled={!isCompleted && stepNumber !== currentStep}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isActive
                    ? "bg-orange-500 text-white"
                    : isCompleted
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500"
                } ${isCompleted || isActive ? "cursor-pointer" : "cursor-not-allowed"}`}
              >
                {isCompleted && !isActive ? <CheckCircle className="w-5 h-5" /> : <span>{stepNumber}</span>}
              </button>

              {/* Connector line */}
              {stepNumber < totalSteps && (
                <div className={`w-12 h-1 mx-1 ${stepNumber < currentStep ? "bg-green-500" : "bg-gray-200"}`}></div>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  // Step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <UserCircle className="w-12 h-12 text-orange-500 mx-auto mb-2" />
              <h2 className="text-xl font-semibold text-gray-800">Informations personnelles</h2>
              <p className="text-gray-500 text-sm">Commençons par vos informations de base</p>
            </div>

            {/* Full Name Field */}
            <div className="space-y-1">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nom complet <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  onChange={handleChange}
                  name="name"
                  id="name"
                  value={formData.name}
                  placeholder="Jean Dupont"
                  className={`w-full rounded-lg border ${errors.name ? "border-red-300 bg-red-50" : "border-gray-300"} pl-10 pr-4 py-3 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-colors`}
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm flex items-center mt-1">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.name[0]}
                </p>
              )}
            </div>

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
                  onChange={handleChange}
                  name="email"
                  value={formData.email}
                  placeholder="exemple@email.com"
                  className={`w-full rounded-lg border ${errors.email ? "border-red-300 bg-red-50" : "border-gray-300"} pl-10 pr-4 py-3 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-colors`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm flex items-center mt-1">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.email[0]}
                </p>
              )}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <MapPinned className="w-12 h-12 text-orange-500 mx-auto mb-2" />
              <h2 className="text-xl font-semibold text-gray-800">Coordonnées</h2>
              <p className="text-gray-500 text-sm">Où pouvons-nous vous joindre ?</p>
            </div>

            {/* Phone Number Field */}
            <div className="space-y-1">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Téléphone <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  onChange={handleChange}
                  name="phone"
                  value={formData.phone}
                  placeholder="06 12 34 56 78"
                  className={`w-full rounded-lg border ${errors.phone ? "border-red-300 bg-red-50" : "border-gray-300"} pl-10 pr-4 py-3 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-colors`}
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm flex items-center mt-1">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.phone[0]}
                </p>
              )}
            </div>

            {/* City Field */}
            <div className="space-y-1">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                Ville <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="city"
                  name="city"
                  onChange={handleChange}
                  value={formData.city}
                  className={`w-full rounded-lg border ${errors.city ? "border-red-300 bg-red-50" : "border-gray-300"} pl-10 pr-4 py-3 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-colors appearance-none bg-none`}
                >
                  {moroccanCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              {errors.city && (
                <p className="text-red-500 text-sm flex items-center mt-1">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.city[0]}
                </p>
              )}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <KeyRound className="w-12 h-12 text-orange-500 mx-auto mb-2" />
              <h2 className="text-xl font-semibold text-gray-800">Sécurité</h2>
              <p className="text-gray-500 text-sm">Créez un mot de passe sécurisé</p>
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
                  onChange={handleChange}
                  name="password"
                  id="password"
                  value={formData.password}
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

              {/* Password strength indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex space-x-1">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-1.5 w-6 rounded-full ${i < passwordStrength ? getPasswordStrengthColor() : "bg-gray-200"} transition-all duration-300`}
                        />
                      ))}
                    </div>
                    <span
                      className={`text-xs font-medium ${
                        passwordStrength === 1
                          ? "text-red-500"
                          : passwordStrength === 2
                            ? "text-orange-500"
                            : passwordStrength === 3
                              ? "text-yellow-500"
                              : passwordStrength === 4
                                ? "text-green-500"
                                : "text-gray-400"
                      }`}
                    >
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                  <ul className="text-xs text-gray-500 space-y-1 mt-2">
                    <li className="flex items-center">
                      {formData.password.length >= 8 ? (
                        <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                      ) : (
                        <XCircle className="h-3 w-3 text-gray-300 mr-1" />
                      )}
                      Au moins 8 caractères
                    </li>
                    <li className="flex items-center">
                      {/[A-Z]/.test(formData.password) ? (
                        <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                      ) : (
                        <XCircle className="h-3 w-3 text-gray-300 mr-1" />
                      )}
                      Au moins une majuscule
                    </li>
                    <li className="flex items-center">
                      {/[0-9]/.test(formData.password) ? (
                        <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                      ) : (
                        <XCircle className="h-3 w-3 text-gray-300 mr-1" />
                      )}
                      Au moins un chiffre
                    </li>
                    <li className="flex items-center">
                      {/[^A-Za-z0-9]/.test(formData.password) ? (
                        <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                      ) : (
                        <XCircle className="h-3 w-3 text-gray-300 mr-1" />
                      )}
                      Au moins un caractère spécial
                    </li>
                  </ul>
                </div>
              )}

              {errors.password && (
                <p className="text-red-500 text-sm flex items-center mt-1">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.password[0]}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-1">
              <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                Confirmez le mot de passe <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="password_confirmation"
                  onChange={handleChange}
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-gray-300 pl-10 pr-10 py-3 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-colors"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {formData.password &&
                formData.password_confirmation &&
                formData.password !== formData.password_confirmation && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Les mots de passe ne correspondent pas
                  </p>
                )}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <CheckSquare className="w-12 h-12 text-orange-500 mx-auto mb-2" />
              <h2 className="text-xl font-semibold text-gray-800">Confirmation</h2>
              <p className="text-gray-500 text-sm">Vérifiez vos informations et confirmez</p>
            </div>

            {/* Summary */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Nom:</span>
                <span className="font-medium">{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Email:</span>
                <span className="font-medium">{formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Téléphone:</span>
                <span className="font-medium">{formData.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Ville:</span>
                <span className="font-medium">{formData.city}</span>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start mt-6">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={() => setAgreeToTerms(!agreeToTerms)}
                  className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-gray-600">
                  J'accepte les{" "}
                  <Link href="/terms" className="text-orange-500 hover:text-orange-600 font-medium">
                    conditions d'utilisation
                  </Link>{" "}
                  et la{" "}
                  <Link href="/privacy" className="text-orange-500 hover:text-orange-600 font-medium">
                    politique de confidentialité
                  </Link>
                </label>
              </div>
            </div>
            {errors.terms && (
              <p className="text-red-500 text-sm flex items-center mt-1">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.terms[0]}
              </p>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <NavBar />

      <div
        className={`py-10 px-4 sm:px-6 md:py-12 transition-all duration-700 mt-10 transform ${animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="max-w-md mx-auto">
          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-8 text-white text-center">
              <h1 className="text-2xl font-bold">Rejoignez LocalExchange</h1>
              <p className="mt-2 opacity-90">Créez votre compte en quelques étapes</p>
            </div>

            {/* Step Indicator */}
            <div className="px-6 pt-8 sm:px-8">
              <StepIndicator currentStep={currentStep} totalSteps={totalSteps} stepComplete={stepComplete} />
            </div>

            {/* Form Body */}
            <div className="p-6 sm:p-8">
              <form onSubmit={currentStep === totalSteps ? handleSubmit : (e) => e.preventDefault()}>
                {/* Step Content */}
                {renderStepContent()}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="flex items-center text-gray-600 hover:text-orange-500 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 mr-1" />
                      Précédent
                    </button>
                  ) : (
                    <div></div> // Empty div to maintain flex spacing
                  )}

                  {currentStep < totalSteps ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="flex items-center bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Suivant
                      <ChevronRight className="w-5 h-5 ml-1" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3 text-center font-semibold text-white hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-300 shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center group"
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
                          Création en cours...
                        </>
                      ) : (
                        <>
                          Créer un compte
                          <ArrowRight className="ml-2 h-5 w-5 transform transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-4 text-sm text-gray-500">Ou</span>
                </div>
              </div>

              {/* Login Button */}
              <Link href="/login" className="block">
                <button
                  type="button"
                  className="w-full rounded-lg bg-white border border-orange-500 px-4 py-3 text-center font-semibold text-orange-500 hover:bg-orange-50 focus:outline-none transition-colors"
                >
                  Se connecter
                </button>
              </Link>
            </div>
          </div>

          {/* Additional information */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              Besoin d'aide ?{" "}
              <Link href="/contact" className="text-orange-500 hover:text-orange-600 font-medium">
                Contactez-nous
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
