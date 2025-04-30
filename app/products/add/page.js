"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Upload,
  Check,
  ArrowRight,
  ArrowLeft,
  Camera,
  MapPin,
  Tag,
  Euro,
  Info,
  FileText,
  Phone,
  AlertCircle,
} from "lucide-react"
import { toast } from "sonner"
import FormField from "../../Components/FormField"
import ImagePreview from "../../components/ImagePreview"
import ProgressIndicator from "../../components/progress-indicator"
import { useRouter } from "next/navigation"
import Cookies from 'js-cookie'

const conditions = ["Neuf", "Comme neuf", "Bon état", "État moyen", "À rénover"]

export default function AddProduct() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [condition, setCondition] = useState("")
  const [location, setLocation] = useState("")
  const [contactInfo, setContactInfo] = useState("")
  const [images, setImages] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [categories, setCategories] = useState([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)
  const totalSteps = 3
  const router = useRouter()

  // Get the bearer token from cookies
  const getAuthToken = () => {
    const token = Cookies.get('access_token')
    if (!token) {
      toast.error("Session expirée", {
        description: "Veuillez vous reconnecter pour continuer.",
      })
      router.push('/login')
      return null
    }
    return token
  }

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      const token = getAuthToken()
      if (!token) return

      try {
        const response = await fetch('http://127.0.0.1:8000/api/categorys', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          }
        })
        if (!response.ok) {
          if (response.status === 401) {
            toast.error("Session expirée", {
              description: "Veuillez vous reconnecter pour continuer.",
            })
            router.push('/login')
            return
          }
          throw new Error('Failed to fetch categories')
        }
        const data = await response.json()
        setCategories(data)
      } catch (error) {
        console.error('Error fetching categories:', error)
        toast.error("Erreur lors du chargement des catégories", {
          description: "Veuillez rafraîchir la page pour réessayer.",
        })
      } finally {
        setIsLoadingCategories(false)
      }
    }

    fetchCategories()
  }, [router])

  const handleImageUpload = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      if (images.length + newFiles.length > 5) {
        toast.error("Maximum 5 images allowed")
        return
      }
      setImages((prev) => [...prev, ...newFiles])
      toast.success(
        `${newFiles.length} image${newFiles.length > 1 ? "s" : ""} ajoutée${newFiles.length > 1 ? "s" : ""}!`
      )
    }
  }

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
    toast.info("Image supprimée")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const token = getAuthToken()
    if (!token) return

    try {
      // Create FormData object to handle file uploads
      const formData = new FormData()
      formData.append('nom', title)
      formData.append('description', description)
      formData.append('prix', price)
      formData.append('localisation', location)
      formData.append('categorie_id', category)
      formData.append('condition', condition)
      formData.append('contactInfo', contactInfo)

      // Append all images
      images.forEach((image, index) => {
        formData.append('images[]', image)
      })

      // Send request to API
      const response = await fetch('http://127.0.0.1:8000/api/product', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body: formData,
      })

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Session expirée", {
            description: "Veuillez vous reconnecter pour continuer.",
          })
          router.push('/login')
          return
        }
        const errorData = await response.json()
        throw new Error(errorData.message || 'Une erreur est survenue lors de la création du produit')
      }

      const data = await response.json()
      
      toast.success("Produit ajouté avec succès!", {
        description: "Votre article a été publié sur LocalExchange.",
      })

      // Redirect to the product page
      router.push(`/products/${data.id}`)
    } catch (error) {
      console.error('Error creating product:', error)
      toast.error("Erreur lors de la création du produit", {
        description: error.message || "Une erreur est survenue. Veuillez réessayer.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const isStepComplete = (step) => {
    switch (step) {
      case 1:
        return title.trim() !== "" && description.trim() !== "" && category !== ""
      case 2:
        return images.length > 0
      case 3:
        return location.trim() !== "" && price.trim() !== ""
      default:
        return false
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
                <FileText className="mr-2 h-5 w-5 text-orange-500" />
                Informations sur le produit
              </h2>
              <p className="text-gray-500">Donnez un maximum de détails pour attirer l'attention des acheteurs.</p>
            </div>

            <FormField label="Titre de l'annonce" htmlFor="title" required icon={<Tag className="h-4 w-4" />}>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Que vendez-vous ?"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 shadow-sm focus:border-orange-400 focus:ring focus:ring-orange-100 transition-all duration-200"
                required
              />
            </FormField>

            <FormField label="Description" htmlFor="description" required icon={<Info className="h-4 w-4" />}>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Décrivez votre article (état, caractéristiques, etc.)"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 shadow-sm focus:border-orange-400 focus:ring focus:ring-orange-100 transition-all duration-200 min-h-[120px]"
                required
              />
            </FormField>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="Catégorie" htmlFor="category" required icon={<Tag className="h-4 w-4" />}>
                <div className="relative">
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 shadow-sm focus:border-orange-400 focus:ring focus:ring-orange-100 transition-all duration-200 appearance-none bg-white"
                    required
                    disabled={isLoadingCategories}
                  >
                    <option value="">Sélectionner une catégorie</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.nom}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                    {isLoadingCategories ? (
                      <svg className="animate-spin h-5 w-5 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </div>
                </div>
              </FormField>

              <FormField label="État" htmlFor="condition" required icon={<AlertCircle className="h-4 w-4" />}>
                <div className="relative">
                  <select
                    id="condition"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 shadow-sm focus:border-orange-400 focus:ring focus:ring-orange-100 transition-all duration-200 appearance-none bg-white"
                    required
                  >
                    <option value="">Sélectionner l'état</option>
                    {conditions.map((cond, index) => (
                      <option key={index} value={cond}>
                        {cond}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </FormField>
            </div>
          </motion.div>
        )
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
                <Camera className="mr-2 h-5 w-5 text-orange-500" />
                Photos du produit
              </h2>
              <p className="text-gray-500">
                Les annonces avec photos sont 10x plus consultées. Ajoutez jusqu'à 5 photos.
              </p>
            </div>

            <div className="relative p-0.5 rounded-xl shadow-sm">
              <div className="group relative flex flex-col justify-center p-8 border border-gray-200 rounded-lg bg-white transition-all duration-200 hover:shadow-md">
                <div className="text-center">
                  <div className="relative mb-4">
                    <div className="w-16 h-16 mx-auto bg-gray-50 rounded-full flex items-center justify-center shadow-sm">
                      <Upload className="h-8 w-8 text-orange-500 transition-transform group-hover:scale-110 duration-300" />
                    </div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="h-14 w-14 bg-orange-500/10 rounded-full animate-ping"></div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label htmlFor="file-upload" className="relative cursor-pointer">
                      <div className="bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg px-6 py-3 inline-flex items-center gap-2 transition-all duration-200 shadow-sm hover:shadow-md">
                        <span>Ajouter des photos</span>
                        <svg
                          className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                      </div>
                      <input
                        id="file-upload"
                        type="file"
                        className="sr-only"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>

                  <p className="mt-3 text-sm text-gray-500">PNG, JPG, GIF jusqu'à 10MB (max: 5 images)</p>
                </div>
              </div>
            </div>

            <ImagePreview images={images} onRemove={removeImage} />

            {images.length === 0 && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-start mt-4 shadow-sm">
                <Info className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">
                  Les annonces avec photos ont 10 fois plus de chances d'être consultées. Ajoutez au moins une photo
                  pour continuer.
                </p>
              </div>
            )}
          </motion.div>
        )
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-orange-500" />
                Localisation et prix
              </h2>
              <p className="text-gray-500">Précisez où se trouve votre article et fixez son prix.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="Prix" htmlFor="price" required icon={<Euro className="h-4 w-4" />}>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 shadow-sm focus:border-orange-400 focus:ring focus:ring-orange-100 transition-all duration-200"
                  step="0.01"
                  min="0"
                  required
                />
              </FormField>

              <FormField label="Localisation" htmlFor="location" required icon={<MapPin className="h-4 w-4" />}>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Ville, Code postal"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 shadow-sm focus:border-orange-400 focus:ring focus:ring-orange-100 transition-all duration-200"
                  required
                />
              </FormField>
            </div>

            <FormField label="Contact" htmlFor="contactInfo" required icon={<Phone className="h-4 w-4" />}>
              <input
                type="text"
                id="contactInfo"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                placeholder="Téléphone ou email"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 shadow-sm focus:border-orange-400 focus:ring focus:ring-orange-100 transition-all duration-200"
                required
              />
            </FormField>

            <div className="bg-white rounded-lg p-4 mt-4 border border-gray-200 shadow-sm">
              <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                <Info className="h-4 w-4 mr-2 text-orange-500" />
                Aperçu de l'annonce
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-sm text-gray-500">Titre</div>
                  <div className="font-medium">{title || "Non spécifié"}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-sm text-gray-500">Catégorie</div>
                  <div className="font-medium">{category || "Non spécifiée"}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-sm text-gray-500">Prix</div>
                  <div className="font-medium">{price ? `${price} €` : "Non spécifié"}</div>
                </div>
              </div>
            </div>
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Déposer une annonce</h1>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Vendez facilement vos objets inutilisés et trouvez des trésors près de chez vous avec LocalExchange.
            </p>
          </div>

          <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />

          <div className="mt-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <form onSubmit={handleSubmit} className="p-6 md:p-8">
                <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>

                <div className="flex justify-between pt-6 border-t border-gray-100 mt-8">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                      currentStep === 1
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-600 hover:text-orange-500 hover:bg-gray-50"
                    }`}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Précédent
                  </button>

                  {currentStep < totalSteps ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!isStepComplete(currentStep)}
                      className={`flex items-center px-6 py-2 rounded-lg transition-all duration-200 ${
                        isStepComplete(currentStep)
                          ? "bg-orange-500 hover:bg-orange-600 text-white shadow-sm hover:shadow-md"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Suivant
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting || !isStepComplete(currentStep)}
                      className={`flex items-center px-6 py-2 rounded-lg transition-all duration-200 ${
                        isSubmitting || !isStepComplete(currentStep)
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-orange-500 hover:bg-orange-600 text-white shadow-sm hover:shadow-md"
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
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
                          Traitement...
                        </>
                      ) : (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Publier l'annonce
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="text-center mt-6 text-sm text-gray-500">
              En publiant cette annonce, vous acceptez nos
              <a href="#" className="text-orange-500 hover:text-orange-600 transition-colors duration-200 ml-1">
                Conditions d'utilisation
              </a>{" "}
              et
              <a href="#" className="text-orange-500 hover:text-orange-600 transition-colors duration-200 ml-1">
                Politique de confidentialité
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}