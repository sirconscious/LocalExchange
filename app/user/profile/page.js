"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import {
    User,
    Mail,
    Phone,
    MapPin,
    Camera,
    Bell,
    Lock,  Save,  Edit,  Package,   Heart,    Star,   Eye,   AlertCircle, X,  ChevronRight,  Clock,   Grid,   List,   Search,ArrowRight, Tag, DollarSign,
}from "lucide-react"
import { toast } from "sonner";
import FormField from "../../Components/form-field";
import NavBarv2 from "../../Components/NavbarSecond";

// Sample product data
const userProducts = [
    {
        id: 1,
        title: "MacBook Pro 2021",
        price: 1200,
        category: "Électronique",
        location: "Lyon",
        image: "/placeholder.svg?height=80&width=80",
        date: "Il y a 2 heures",
        views: 24,
        status: "active",
    },
    {
        id: 2,
        title: "Canapé d'angle convertible",
        price: 350,
        category: "Ameublement",
        location: "Paris",
        image: "/placeholder.svg?height=80&width=80",
        date: "Il y a 1 jour",
        views: 56,
        status: "active",
    },
    {
        id: 3,
        title: "Vélo de route Decathlon",
        price: 450,
        category: "Sport",
        location: "Marseille",
        image: "/placeholder.svg?height=80&width=80",
        date: "Il y a 3 jours",
        views: 38,
        status: "sold",
    },
    {
        id: 4,
        title: "iPhone 13 Pro Max",
        price: 850,
        category: "Électronique",
        location: "Lyon",
        image: "/placeholder.svg?height=80&width=80",
        date: "Il y a 1 semaine",
        views: 112,
        status: "sold",
    },
    {
        id: 5,
        title: "Table à manger en bois",
        price: 180,
        category: "Ameublement",
        location: "Lyon",
        image: "/placeholder.svg?height=80&width=80",
        date: "Il y a 2 semaines",
        views: 45,
        status: "active",
    },
]

export default function ProfilePage() {
    // User information state
    const [name, setName] = useState("Thomas Dupont")
    const [email, setEmail] = useState("thomas.dupont@example.com")
    const [phone, setPhone] = useState("06 12 34 56 78")
    const [location, setLocation] = useState("Lyon, 69003")
    const [bio, setBio] = useState(
        "Passionné de technologie et de sport. J'aime trouver de bonnes affaires et donner une seconde vie aux objets.",
    )
    const [profileImage, setProfileImage] = useState(null)

    // Password state
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    // Notification preferences
    const [emailNotifications, setEmailNotifications] = useState(true)
    const [smsNotifications, setSmsNotifications] = useState(false)
    const [newListingNotifications, setNewListingNotifications] = useState(true)
    const [messageNotifications, setMessageNotifications] = useState(true)

    // Edit states
    const [isEditingProfile, setIsEditingProfile] = useState(false)
    const [isChangingPassword, setIsChangingPassword] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    // Product history states
    const [viewMode, setViewMode] = useState("grid") // grid or list
    const [statusFilter, setStatusFilter] = useState("all") // all, active, sold
    const [showAllProducts, setShowAllProducts] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [activeTab, setActiveTab] = useState("all")

    // Refs
    const fileInputRef = useRef(null)
    const productHistoryRef = useRef(null)

    // Filter products based on status and search query
    const filteredProducts = userProducts.filter((product) => {
        const matchesStatus = statusFilter === "all" || product.status === statusFilter
        const matchesSearch =
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesStatus && matchesSearch
    })

    // Products to display (limited or all)
    const displayedProducts = showAllProducts ? filteredProducts : filteredProducts.slice(0, 3)

    // Scroll to product history section
    const scrollToProductHistory = () => {
        productHistoryRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    // Handle profile image upload
    const handleImageUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            const reader = new FileReader()

            reader.onload = (e) => {
                if (e.target?.result) {
                    setProfileImage(e.target.result)
                    toast.success("Photo de profil mise à jour")
                }
            }

            reader.readAsDataURL(file)
        }
    }

    // Trigger file input click
    const triggerFileInput = () => {
        fileInputRef.current?.click()
    }

    // Save profile information
    const saveProfileInfo = () => {
        setIsSaving(true)

        // Simulate API call
        setTimeout(() => {
            setIsSaving(false)
            setIsEditingProfile(false)
            toast.success("Profil mis à jour avec succès")
        }, 1000)
    }

    // Change password
    const changePassword = () => {
        // Validate passwords
        if (newPassword !== confirmPassword) {
            toast.error("Les mots de passe ne correspondent pas")
            return
        }

        if (newPassword.length < 8) {
            toast.error("Le mot de passe doit contenir au moins 8 caractères")
            return
        }

        setIsSaving(true)

        // Simulate API call
        setTimeout(() => {
            setIsSaving(false)
            setIsChangingPassword(false)
            setCurrentPassword("")
            setNewPassword("")
            setConfirmPassword("")
            toast.success("Mot de passe modifié avec succès")
        }, 1000)
    }

    // Save notification preferences
    const saveNotificationPreferences = () => {
        setIsSaving(true)

        // Simulate API call
        setTimeout(() => {
            setIsSaving(false)
            toast.success("Préférences de notification mises à jour")
        }, 1000)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <NavBarv2 />
            <div className="mt-14 container mx-auto px-4 sm:px-6 py-8">
                <div className="max-w-5xl mx-auto">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Profile Summary Card */}
                        <div className="md:col-span-1">
                            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                                <div className="p-6 text-center">
                                    <div className="relative inline-block mb-4">
                                        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-2 border-white shadow-md mx-auto">
                                            {profileImage ? (
                                                <img
                                                    src={profileImage || "/placeholder.svg"}
                                                    alt="Profile"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-orange-50 text-orange-500">
                                                    <User size={40} />
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            onClick={triggerFileInput}
                                            className="absolute bottom-0 right-0 bg-orange-500 text-white p-2 rounded-full shadow-sm hover:bg-orange-600 transition-colors duration-200"
                                            aria-label="Change profile picture"
                                        >
                                            <Camera size={16} />
                                        </button>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                        />
                                    </div>

                                    <h2 className="text-xl font-bold text-gray-800">{name}</h2>
                                    <p className="text-gray-500 text-sm mt-1">{location}</p>

                                    <div className="mt-4 flex justify-center space-x-4 text-sm">
                                        <div className="text-center">
                                            <div className="font-bold text-gray-800">12</div>
                                            <div className="text-gray-500">Annonces</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="font-bold text-gray-800">8</div>
                                            <div className="text-gray-500">Vendus</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="font-bold text-gray-800">4.8</div>
                                            <div className="text-gray-500">Évaluation</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 px-6 py-4">
                                    <h3 className="font-medium text-gray-800 mb-2">Statistiques</h3>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center text-gray-600">
                                                <Package size={16} className="mr-2 text-orange-500" />
                                                Annonces actives
                                            </div>
                                            <span className="font-medium">5</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center text-gray-600">
                                                <Heart size={16} className="mr-2 text-orange-500" />
                                                Favoris
                                            </div>
                                            <span className="font-medium">18</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center text-gray-600">
                                                <Star size={16} className="mr-2 text-orange-500" />
                                                Évaluations reçues
                                            </div>
                                            <span className="font-medium">15</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center text-gray-600">
                                                <Eye size={16} className="mr-2 text-orange-500" />
                                                Vues du profil
                                            </div>
                                            <span className="font-medium">243</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 px-6 py-4">
                                    <button
                                        onClick={scrollToProductHistory}
                                        className="w-full flex items-center justify-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium"
                                    >
                                        <Package className="h-4 w-4 mr-2" />
                                        Voir mes annonces
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="md:col-span-2 space-y-6">
                            {/* Profile Information */}
                            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-xl font-bold text-gray-800 flex items-center">
                                            <User className="mr-2 h-5 w-5 text-orange-500" />
                                            Informations personnelles
                                        </h2>
                                        <button
                                            onClick={() => setIsEditingProfile(!isEditingProfile)}
                                            className="text-sm flex items-center text-orange-500 hover:text-orange-600 transition-colors duration-200"
                                        >
                                            {isEditingProfile ? (
                                                <>
                                                    <X className="h-4 w-4 mr-1" />
                                                    Annuler
                                                </>
                                            ) : (
                                                <>
                                                    <Edit className="h-4 w-4 mr-1" />
                                                    Modifier
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    {isEditingProfile ? (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                                            <FormField label="Nom complet" htmlFor="name" icon={<User className="h-4 w-4" />}>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 shadow-sm focus:border-orange-400 focus:ring focus:ring-orange-100 transition-all duration-200"
                                                />
                                            </FormField>

                                            <FormField label="Email" htmlFor="email" icon={<Mail className="h-4 w-4" />}>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 shadow-sm focus:border-orange-400 focus:ring focus:ring-orange-100 transition-all duration-200"
                                                />
                                            </FormField>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <FormField label="Téléphone" htmlFor="phone" icon={<Phone className="h-4 w-4" />}>
                                                    <input
                                                        type="tel"
                                                        id="phone"
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value)}
                                                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 shadow-sm focus:border-orange-400 focus:ring focus:ring-orange-100 transition-all duration-200"
                                                    />
                                                </FormField>

                                                <FormField label="Localisation" htmlFor="location" icon={<MapPin className="h-4 w-4" />}>
                                                    <input
                                                        type="text"
                                                        id="location"
                                                        value={location}
                                                        onChange={(e) => setLocation(e.target.value)}
                                                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 shadow-sm focus:border-orange-400 focus:ring focus:ring-orange-100 transition-all duration-200"
                                                    />
                                                </FormField>
                                            </div>

                                            <FormField label="Bio" htmlFor="bio" icon={<User className="h-4 w-4" />}>
                                                <textarea
                                                    id="bio"
                                                    value={bio}
                                                    onChange={(e) => setBio(e.target.value)}
                                                    rows={3}
                                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 shadow-sm focus:border-orange-400 focus:ring focus:ring-orange-100 transition-all duration-200"
                                                />
                                            </FormField>

                                            <div className="flex justify-end mt-2">
                                                <button
                                                    onClick={saveProfileInfo}
                                                    disabled={isSaving}
                                                    className="flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                                                >
                                                    {isSaving ? (
                                                        <>
                                                            <svg
                                                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                                                            Enregistrement...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Save className="h-4 w-4 mr-2" />
                                                            Enregistrer
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <div className="text-sm text-gray-500">Nom complet</div>
                                                    <div className="font-medium text-gray-800 flex items-center mt-1">
                                                        <User className="h-4 w-4 text-orange-500 mr-2" />
                                                        {name}
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="text-sm text-gray-500">Email</div>
                                                    <div className="font-medium text-gray-800 flex items-center mt-1">
                                                        <Mail className="h-4 w-4 text-orange-500 mr-2" />
                                                        {email}
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="text-sm text-gray-500">Téléphone</div>
                                                    <div className="font-medium text-gray-800 flex items-center mt-1">
                                                        <Phone className="h-4 w-4 text-orange-500 mr-2" />
                                                        {phone}
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="text-sm text-gray-500">Localisation</div>
                                                    <div className="font-medium text-gray-800 flex items-center mt-1">
                                                        <MapPin className="h-4 w-4 text-orange-500 mr-2" />
                                                        {location}
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="text-sm text-gray-500">Bio</div>
                                                <div className="text-gray-800 mt-1 bg-gray-50 p-3 rounded-lg">{bio}</div>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </div>

                            {/* Password Change */}
                            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-xl font-bold text-gray-800 flex items-center">
                                            <Lock className="mr-2 h-5 w-5 text-orange-500" />
                                            Sécurité
                                        </h2>
                                        <button
                                            onClick={() => setIsChangingPassword(!isChangingPassword)}
                                            className="text-sm flex items-center text-orange-500 hover:text-orange-600 transition-colors duration-200"
                                        >
                                            {isChangingPassword ? (
                                                <>
                                                    <X className="h-4 w-4 mr-1" />
                                                    Annuler
                                                </>
                                            ) : (
                                                <>
                                                    <Edit className="h-4 w-4 mr-1" />
                                                    Changer le mot de passe
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    {isChangingPassword ? (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                                            <FormField
                                                label="Mot de passe actuel"
                                                htmlFor="currentPassword"
                                                icon={<Lock className="h-4 w-4" />}
                                            >
                                                <input
                                                    type="password"
                                                    id="currentPassword"
                                                    value={currentPassword}
                                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 shadow-sm focus:border-orange-400 focus:ring focus:ring-orange-100 transition-all duration-200"
                                                />
                                            </FormField>

                                            <FormField label="Nouveau mot de passe" htmlFor="newPassword" icon={<Lock className="h-4 w-4" />}>
                                                <input
                                                    type="password"
                                                    id="newPassword"
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 shadow-sm focus:border-orange-400 focus:ring focus:ring-orange-100 transition-all duration-200"
                                                />
                                            </FormField>

                                            <FormField
                                                label="Confirmer le mot de passe"
                                                htmlFor="confirmPassword"
                                                icon={<Lock className="h-4 w-4" />}
                                            >
                                                <input
                                                    type="password"
                                                    id="confirmPassword"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 shadow-sm focus:border-orange-400 focus:ring focus:ring-orange-100 transition-all duration-200"
                                                />
                                            </FormField>

                                            {newPassword && newPassword.length < 8 && (
                                                <div className="flex items-start text-sm text-orange-600 bg-orange-50 p-3 rounded-lg">
                                                    <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
                                                    <span>Le mot de passe doit contenir au moins 8 caractères</span>
                                                </div>
                                            )}

                                            {newPassword && confirmPassword && newPassword !== confirmPassword && (
                                                <div className="flex items-start text-sm text-orange-600 bg-orange-50 p-3 rounded-lg">
                                                    <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
                                                    <span>Les mots de passe ne correspondent pas</span>
                                                </div>
                                            )}

                                            <div className="flex justify-end mt-2">
                                                <button
                                                    onClick={changePassword}
                                                    disabled={
                                                        isSaving ||
                                                        !currentPassword ||
                                                        !newPassword ||
                                                        !confirmPassword ||
                                                        newPassword !== confirmPassword ||
                                                        newPassword.length < 8
                                                    }
                                                    className={`flex items-center px-4 py-2 rounded-lg shadow-sm transition-all duration-200 ${isSaving ||
                                                            !currentPassword ||
                                                            !newPassword ||
                                                            !confirmPassword ||
                                                            newPassword !== confirmPassword ||
                                                            newPassword.length < 8
                                                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                            : "bg-orange-500 hover:bg-orange-600 text-white hover:shadow-md"
                                                        }`}
                                                >
                                                    {isSaving ? (
                                                        <>
                                                            <svg
                                                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                                                            Enregistrement...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Save className="h-4 w-4 mr-2" />
                                                            Mettre à jour le mot de passe
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <div className="flex items-start">
                                                <div className="bg-orange-100 p-2 rounded-full mr-3">
                                                    <Lock className="h-5 w-5 text-orange-500" />
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-gray-800">Sécurité du compte</h3>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        Votre mot de passe a été mis à jour pour la dernière fois il y a 3 mois. Nous vous
                                                        recommandons de changer votre mot de passe régulièrement pour assurer la sécurité de votre
                                                        compte.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Product History Section */}
                            <div ref={productHistoryRef} className="bg-white rounded-xl shadow-md overflow-hidden">
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-xl font-bold text-gray-800 flex items-center">
                                            <Package className="mr-2 h-5 w-5 text-orange-500" />
                                            Historique des annonces
                                        </h2>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => setViewMode("grid")}
                                                className={`p-1.5 rounded-md ${viewMode === "grid" ? "bg-orange-100 text-orange-600" : "text-gray-400 hover:text-gray-600"
                                                    }`}
                                            >
                                                <Grid className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => setViewMode("list")}
                                                className={`p-1.5 rounded-md ${viewMode === "list" ? "bg-orange-100 text-orange-600" : "text-gray-400 hover:text-gray-600"
                                                    }`}
                                            >
                                                <List className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                                            <button
                                                onClick={() => setActiveTab("all")}
                                                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === "all" ? "bg-white text-gray-800 shadow-sm" : "text-gray-600 hover:text-gray-800"
                                                    }`}
                                            >
                                                Toutes
                                            </button>
                                            <button
                                                onClick={() => setActiveTab("active")}
                                                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === "active"
                                                        ? "bg-white text-gray-800 shadow-sm"
                                                        : "text-gray-600 hover:text-gray-800"
                                                    }`}
                                            >
                                                Actives
                                            </button>
                                            <button
                                                onClick={() => setActiveTab("sold")}
                                                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === "sold"
                                                        ? "bg-white text-gray-800 shadow-sm"
                                                        : "text-gray-600 hover:text-gray-800"
                                                    }`}
                                            >
                                                Vendues
                                            </button>
                                        </div>

                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Search className="h-4 w-4 text-gray-400" />
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Rechercher..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-200 rounded-lg focus:border-orange-300 focus:ring focus:ring-orange-100"
                                            />
                                        </div>
                                    </div>

                                    {/* Grid View */}
                                    {viewMode === "grid" && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                                            {displayedProducts.map((product) => (
                                                <motion.div
                                                    key={product.id}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
                                                >
                                                    <div className="relative h-40 bg-gray-100">
                                                        <img
                                                            src={product.image || "/placeholder.svg"}
                                                            alt={product.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                        <div className="absolute top-2 right-2">
                                                            <span
                                                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${product.status === "active"
                                                                        ? "bg-green-100 text-green-800"
                                                                        : "bg-blue-100 text-blue-800"
                                                                    }`}
                                                            >
                                                                {product.status === "active" ? "Actif" : "Vendu"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="p-4">
                                                        <h3 className="font-medium text-gray-900 mb-1 truncate">{product.title}</h3>
                                                        <div className="flex items-center text-orange-500 font-bold mb-2">
                                                            <DollarSign className="h-4 w-4 mr-1" />
                                                            {product.price} €
                                                        </div>
                                                        <div className="flex items-center justify-between text-xs text-gray-500">
                                                            <div className="flex items-center">
                                                                <Tag className="h-3 w-3 mr-1" />
                                                                {product.category}
                                                            </div>
                                                            <div className="flex items-center">
                                                                <Clock className="h-3 w-3 mr-1" />
                                                                {product.date}
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center justify-between mt-3">
                                                            <div className="flex items-center text-xs text-gray-500">
                                                                <Eye className="h-3 w-3 mr-1" />
                                                                {product.views} vues
                                                            </div>
                                                            <button className="text-xs text-orange-500 hover:text-orange-600 font-medium flex items-center">
                                                                Détails
                                                                <ChevronRight className="h-3 w-3 ml-1" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    )}

                                    {/* List View */}
                                    {viewMode === "list" && (
                                        <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Produit
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Prix
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Statut
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Date
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Vues
                                                        </th>
                                                        <th scope="col" className="relative px-6 py-3">
                                                            <span className="sr-only">Actions</span>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {displayedProducts.map((product) => (
                                                        <tr key={product.id} className="hover:bg-gray-50 transition-colors duration-150">
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="h-10 w-10 flex-shrink-0 rounded-md overflow-hidden">
                                                                        <img
                                                                            src={product.image || "/placeholder.svg"}
                                                                            alt={product.title}
                                                                            className="h-full w-full object-cover"
                                                                        />
                                                                    </div>
                                                                    <div className="ml-4">
                                                                        <div className="text-sm font-medium text-gray-900">{product.title}</div>
                                                                        <div className="text-xs text-gray-500">{product.category}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="text-sm font-medium text-gray-900">{product.price} €</div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <span
                                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.status === "active"
                                                                            ? "bg-green-100 text-green-800"
                                                                            : "bg-blue-100 text-blue-800"
                                                                        }`}
                                                                >
                                                                    {product.status === "active" ? "Actif" : "Vendu"}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.date}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.views}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                <button className="text-orange-500 hover:text-orange-600">Détails</button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}

                                    {/* Show More Button */}
                                    {filteredProducts.length > 3 && (
                                        <div className="mt-6 text-center">
                                            <button
                                                onClick={() => setShowAllProducts(!showAllProducts)}
                                                className="inline-flex items-center px-4 py-2 border border-orange-300 text-sm font-medium rounded-md text-orange-600 bg-white hover:bg-orange-50 transition-colors duration-200"
                                            >
                                                {showAllProducts ? (
                                                    <>Voir moins</>
                                                ) : (
                                                    <>
                                                        Voir toutes mes annonces ({filteredProducts.length})
                                                        <ArrowRight className="ml-2 h-4 w-4" />
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Notification Preferences */}
                            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                                <div className="p-6">
                                    <h2 className="text-xl font-bold text-gray-800 flex items-center mb-4">
                                        <Bell className="mr-2 h-5 w-5 text-orange-500" />
                                        Préférences de notification
                                    </h2>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <Mail className="h-4 w-4 text-orange-500 mr-2" />
                                                <span className="text-gray-700">Notifications par email</span>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={emailNotifications}
                                                    onChange={() => setEmailNotifications(!emailNotifications)}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                                            </label>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <Phone className="h-4 w-4 text-orange-500 mr-2" />
                                                <span className="text-gray-700">Notifications par SMS</span>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={smsNotifications}
                                                    onChange={() => setSmsNotifications(!smsNotifications)}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                                            </label>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <Package className="h-4 w-4 text-orange-500 mr-2" />
                                                <span className="text-gray-700">Nouvelles annonces correspondant à mes recherches</span>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={newListingNotifications}
                                                    onChange={() => setNewListingNotifications(!newListingNotifications)}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                                            </label>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <Mail className="h-4 w-4 text-orange-500 mr-2" />
                                                <span className="text-gray-700">Nouveaux messages</span>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={messageNotifications}
                                                    onChange={() => setMessageNotifications(!messageNotifications)}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                                            </label>
                                        </div>

                                        <div className="flex justify-end mt-2">
                                            <button
                                                onClick={saveNotificationPreferences}
                                                disabled={isSaving}
                                                className="flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                                            >
                                                {isSaving ? (
                                                    <>
                                                        <svg
                                                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                                                        Enregistrement...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Save className="h-4 w-4 mr-2" />
                                                        Enregistrer les préférences
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Account Deletion */}
                            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                                <div className="p-6">
                                    <h2 className="text-xl font-bold text-gray-800 flex items-center mb-4">
                                        <AlertCircle className="mr-2 h-5 w-5 text-orange-500" />
                                        Suppression du compte
                                    </h2>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <div className="flex items-start">
                                            <div className="bg-red-100 p-2 rounded-full mr-3">
                                                <AlertCircle className="h-5 w-5 text-red-500" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-gray-800">Zone de danger</h3>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    La suppression de votre compte est définitive et irréversible. Toutes vos données, y compris
                                                    vos annonces, messages et évaluations, seront supprimées.
                                                </p>
                                                <button className="mt-3 px-4 py-2 bg-white border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors duration-200 text-sm font-medium">
                                                    Supprimer mon compte
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
