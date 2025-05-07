"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import {
  User,
  Mail,
  Phone,
  Camera,
  Lock,
  Save,
  Edit,
  AlertCircle,
  X,
  Shield,
  Bell,
  Moon,
  Globe,
  Key,
  LogOut,
  Sun,
} from "lucide-react"
import { toast } from "sonner"
import AdminLayout from "../../Components/admin-layout"
import ClientAxios from "../../server/AxiosClient"
import Cookies from "js-cookie"

export default function AdminSettings() {
  // Admin information state
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [profileImage, setProfileImage] = useState(null)
  const [role, setRole] = useState("")
  const [lastLogin, setLastLogin] = useState("")
  
  // Password state
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [twoFactorAuth, setTwoFactorAuth] = useState(false)

  // Edit states
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Refs
  const fileInputRef = useRef(null)

  // Fetch admin data
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = Cookies.get("access_token")

        const response = await ClientAxios.get("/api/user",{
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json"
          }
        })
        console.log("daraaa aaaaa ",response.data.Profile_image)
        const adminData = response.data.user
        
        setName(adminData.name || "")
        setEmail(adminData.email || "")
        setPhone(adminData.phone || "")
        setProfileImage(response.data.Profile_image || null)
        setRole(adminData.role || "Administrateur")
        setLastLogin(adminData.last_login ? new Date(adminData.last_login).toLocaleString() : "Jamais")
        
      } catch (error) {
        console.error("Error fetching admin data:", error)
        toast.error("Erreur lors du chargement des données administrateur")
      }
    }

    fetchAdminData()
  }, [])

  // Handle profile image upload
  const handleImageUpload = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('image', file)

      try {
        const token = Cookies.get("access_token")
        const response = await ClientAxios.post("/api/user/update-image", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${token}`
          }
        })
        setProfileImage(response.data.image_url)
        toast.success("Photo de profil mise à jour")
      } catch (error) {
        console.error("Error uploading image:", error)
        toast.error("Erreur lors de la mise à jour de la photo de profil")
      }
    }
  }

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  // Save profile information
  const saveProfileInfo = async () => {
    setIsSaving(true)
    try {
      const token = Cookies.get("access_token")
      if (token) {
        ClientAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      }
      const response = await ClientAxios.put("/api/user/update", {
        name,
        email,
        phone
      })
      setIsEditingProfile(false)
      toast.success("Profil administrateur mis à jour avec succès")
    } catch (error) {
      console.error("Error updating profile:", error)
      toast.error("Erreur lors de la mise à jour du profil")
    } finally {
      setIsSaving(false)
    }
  }

  // Change password
  const changePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas")
      return
    }

    if (newPassword.length < 8) {
      toast.error("Le mot de passe doit contenir au moins 8 caractères")
      return
    }

    setIsSaving(true)
    try {
      const token = Cookies.get("access_token")
      if (token) {
        ClientAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      }
      await ClientAxios.put("/api/user/update-password", {
        current_password: currentPassword,
        password: newPassword,
        password_confirmation: confirmPassword
      })
      setIsChangingPassword(false)
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      toast.success("Mot de passe administrateur modifié avec succès")
    } catch (error) {
      console.error("Error changing password:", error)
      if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error("Erreur lors de la modification du mot de passe")
      }
    } finally {
      setIsSaving(false)
    }
  }



  // Logout function
  const handleLogout = async () => {
    try {
      const token = Cookies.get("access_token")
      if (token) {
        ClientAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      }
      await ClientAxios.get("/api/logout")
      Cookies.remove("access_token")
      toast.success("Déconnexion réussie")
      window.location.href = "/login"
    } catch (error) {
      console.error("Error logging out:", error)
      toast.error("Erreur lors de la déconnexion")
    }
  }

  // Delete account
  const deleteAccount = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte administrateur ? Cette action est irréversible.")) {
      try {
        const token = Cookies.get("access_token")
        if (token) {
          ClientAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        }
        await ClientAxios.delete("/api/admin/delete-account")
        Cookies.remove("access_token")
        window.location.href = "/admin/login"
        toast.success("Compte administrateur supprimé avec succès")
      } catch (error) {
        console.error("Error deleting account:", error)
        toast.error("Erreur lors de la suppression du compte")
      }
    }
  }

  return (
    <AdminLayout>
      <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Paramètres administrateur</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gérez vos informations personnelles, la sécurité et les préférences du compte administrateur
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Summary Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
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
                <p className="text-gray-500 text-sm mt-1">{role}</p>

                <div className="mt-6 space-y-3">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-sm hover:shadow-md transition-colors duration-200 text-sm font-medium"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Déconnexion
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-100 px-6 py-4">
                <h3 className="font-medium text-gray-800 mb-2">Informations de connexion</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-600">
                      <Mail size={16} className="mr-2 text-orange-500" />
                      Email
                    </div>
                    <span className="font-medium">{email}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-600">
                      <Key size={16} className="mr-2 text-orange-500" />
                      Dernière connexion
                    </div>
                    <span className="font-medium">{lastLogin}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Information */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
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
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Nom complet
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-4 w-4 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 shadow-sm focus:border-orange-400 focus:ring focus:ring-orange-100 transition-all duration-200"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-4 w-4 text-gray-400" />
                          </div>
                          <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 shadow-sm focus:border-orange-400 focus:ring focus:ring-orange-100 transition-all duration-200"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Téléphone
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-4 w-4 text-gray-400" />
                          </div>
                          <input
                            type="tel"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 shadow-sm focus:border-orange-400 focus:ring focus:ring-orange-100 transition-all duration-200"
                          />
                        </div>
                      </div>

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
                        <div className="text-sm text-gray-500">Rôle</div>
                        <div className="font-medium text-gray-800 flex items-center mt-1">
                          <Shield className="h-4 w-4 text-orange-500 mr-2" />
                          {role}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Password Change */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
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
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Mot de passe actuel
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="password"
                          id="currentPassword"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 shadow-sm focus:border-orange-400 focus:ring focus:ring-orange-100 transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Nouveau mot de passe
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="password"
                          id="newPassword"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 shadow-sm focus:border-orange-400 focus:ring focus:ring-orange-100 transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirmer le mot de passe
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="password"
                          id="confirmPassword"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 shadow-sm focus:border-orange-400 focus:ring focus:ring-orange-100 transition-all duration-200"
                        />
                      </div>
                    </div>

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
                        className={`flex items-center px-4 py-2 rounded-lg shadow-sm transition-all duration-200 ${
                          isSaving ||
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
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-start">
                        <div className="bg-orange-100 p-2 rounded-full mr-3">
                          <Lock className="h-5 w-5 text-orange-500" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">Sécurité du compte</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Votre mot de passe a été mis à jour pour la dernière fois il y a 30 jours. Nous vous
                            recommandons de changer votre mot de passe régulièrement pour assurer la sécurité de votre
                            compte administrateur.
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>
                )}
              </div>
            </div>

            {/* Account Management */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center mb-4">
                  <AlertCircle className="mr-2 h-5 w-5 text-orange-500" />
                  Gestion du compte
                </h2>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <div className="bg-red-100 p-2 rounded-full mr-3">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Zone de danger</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Les actions suivantes sont irréversibles. Assurez-vous de comprendre les conséquences avant de
                        procéder.
                      </p>

                      <div className="mt-4 space-y-3">
                        <button 
                          onClick={deleteAccount}
                          className="w-full px-4 py-2 bg-white border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200 text-sm font-medium flex items-center justify-center"
                        >
                          <AlertCircle className="h-4 w-4 mr-2" />
                          Supprimer le compte administrateur
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
    </AdminLayout>
  )
}