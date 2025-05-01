"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  LayoutDashboard,
  Package,
  Heart,
  MessageCircle,
  TrendingUp,
  User,
  Bell,
  Search,
  Plus,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  DollarSign,
  Clock,
  Star,
  MoreHorizontal,
} from "lucide-react"

// Sample data
const recentListings = [
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
]

const messages = [
  {
    id: 1,
    user: "Marie Dubois",
    avatar: "/placeholder.svg?height=40&width=40",
    message: "Bonjour, est-ce que l'article est toujours disponible ?",
    time: "14:32",
    unread: true,
    product: "MacBook Pro 2021",
  },
  {
    id: 2,
    user: "Thomas Martin",
    avatar: "/placeholder.svg?height=40&width=40",
    message: "Merci pour votre réponse. Je suis intéressé par...",
    time: "Hier",
    unread: false,
    product: "Canapé d'angle convertible",
  },
  {
    id: 3,
    user: "Sophie Bernard",
    avatar: "/placeholder.svg?height=40&width=40",
    message: "Pouvez-vous faire une remise sur le prix ?",
    time: "Lun",
    unread: false,
    product: "Vélo de route Decathlon",
  },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center">
                  <div className="h-8 w-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
                    LE
                  </div>
                  <span className="ml-2 text-lg font-semibold text-gray-900">LocalExchange</span>
                </div>
              </div>
            </div>

            <div className="hidden md:block flex-1 max-w-md mx-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50 transition-all duration-200"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-1 text-gray-500 hover:text-orange-500 transition-colors duration-200">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-orange-500 rounded-full"></span>
              </button>
              <button className="relative p-1 text-gray-500 hover:text-orange-500 transition-colors duration-200">
                <MessageCircle className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-orange-500 rounded-full"></span>
              </button>
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <User className="h-5 w-5 text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <nav className="p-2">
                <div className="space-y-1">
                  {[
                    { name: "Tableau de bord", icon: LayoutDashboard, id: "overview" },
                    { name: "Mes annonces", icon: Package, id: "listings" },
                    { name: "Favoris", icon: Heart, id: "favorites" },
                    { name: "Messages", icon: MessageCircle, id: "messages" },
                    { name: "Statistiques", icon: TrendingUp, id: "stats" },
                    { name: "Profil", icon: User, id: "profile" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                        activeTab === item.id
                          ? "bg-orange-50 text-orange-600"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <item.icon
                        className={`mr-3 h-5 w-5 ${
                          activeTab === item.id ? "text-orange-500" : "text-gray-400 group-hover:text-gray-500"
                        }`}
                      />
                      {item.name}
                      {(item.id === "messages" || item.id === "favorites") && (
                        <span className="ml-auto bg-orange-100 text-orange-600 py-0.5 px-2 rounded-full text-xs">
                          {item.id === "messages" ? "3" : "5"}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </nav>

              <div className="p-4 border-t border-gray-100">
                <button className="w-full flex items-center justify-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-sm transition-all duration-200 text-sm font-medium">
                  <Plus className="h-4 w-4 mr-2" />
                  Déposer une annonce
                </button>
              </div>
            </div>

            <div className="mt-6 bg-white rounded-xl shadow-sm overflow-hidden p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">Statistiques</h3>
                <span className="text-xs text-gray-500">Ce mois</span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Vues</span>
                    <div className="flex items-center text-green-600">
                      <span className="font-medium">243</span>
                      <ArrowUpRight className="h-3 w-3 ml-1" />
                      <span className="text-xs ml-1">12%</span>
                    </div>
                  </div>
                  <div className="mt-1 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: "70%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Messages</span>
                    <div className="flex items-center text-green-600">
                      <span className="font-medium">18</span>
                      <ArrowUpRight className="h-3 w-3 ml-1" />
                      <span className="text-xs ml-1">5%</span>
                    </div>
                  </div>
                  <div className="mt-1 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: "45%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Favoris</span>
                    <div className="flex items-center text-red-500">
                      <span className="font-medium">8</span>
                      <ArrowDownRight className="h-3 w-3 ml-1" />
                      <span className="text-xs ml-1">3%</span>
                    </div>
                  </div>
                  <div className="mt-1 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 rounded-full" style={{ width: "25%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Bonjour, Thomas</h1>
              <p className="text-gray-500 mt-1">Voici un aperçu de votre activité sur LocalExchange</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                {
                  title: "Annonces actives",
                  value: "5",
                  change: "+1 cette semaine",
                  icon: Package,
                  color: "bg-blue-500",
                },
                {
                  title: "Ventes réalisées",
                  value: "12",
                  change: "2 500 € au total",
                  icon: DollarSign,
                  color: "bg-green-500",
                },
                {
                  title: "Vues totales",
                  value: "1.2k",
                  change: "+18% ce mois",
                  icon: Eye,
                  color: "bg-purple-500",
                },
                {
                  title: "Évaluation moyenne",
                  value: "4.8",
                  change: "15 évaluations",
                  icon: Star,
                  color: "bg-orange-500",
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm p-4 relative overflow-hidden"
                >
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                      <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                    </div>
                    <div className={`h-10 w-10 rounded-lg ${stat.color} flex items-center justify-center text-white`}>
                      <stat.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100">
                    <div className={`h-full ${stat.color}`} style={{ width: `${25 + index * 20}%` }}></div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recent Listings */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Annonces récentes</h2>
                  <button className="text-sm text-orange-500 hover:text-orange-600 font-medium flex items-center transition-colors duration-200">
                    Voir toutes
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Produit
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Prix
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vues
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {recentListings.map((listing) => (
                      <tr key={listing.id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 rounded-md overflow-hidden">
                              <img
                                src={listing.image || "/placeholder.svg"}
                                alt={listing.title}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{listing.title}</div>
                              <div className="text-xs text-gray-500">
                                {listing.category} • {listing.location}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{listing.price} €</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-500">
                            <Eye className="h-4 w-4 mr-1 text-gray-400" />
                            {listing.views}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              listing.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {listing.status === "active" ? "Actif" : "Vendu"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1 text-gray-400" />
                            {listing.date}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-gray-400 hover:text-gray-500">
                            <MoreHorizontal className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Messages */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Messages récents</h2>
                  <button className="text-sm text-orange-500 hover:text-orange-600 font-medium flex items-center transition-colors duration-200">
                    Voir tous
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {messages.map((message) => (
                  <div key={message.id} className="p-4 hover:bg-gray-50 transition-colors duration-150 cursor-pointer">
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                        <img
                          src={message.avatar || "/placeholder.svg"}
                          alt={message.user}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-3 flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 truncate">{message.user}</p>
                          <div className="flex items-center">
                            <p className="text-xs text-gray-500">{message.time}</p>
                            {message.unread && <span className="ml-2 h-2 w-2 bg-orange-500 rounded-full"></span>}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 truncate mt-1">{message.message}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          <span className="inline-flex items-center">
                            <Package className="h-3 w-3 mr-1" />
                            {message.product}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}