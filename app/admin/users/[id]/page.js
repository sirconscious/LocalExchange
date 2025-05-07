"use client"

import { useState,useEffect } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import ClientAxios from "../../../server/AxiosClient"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Package,
  ShoppingCart,
  Heart,
  Eye,
  MessageSquare,
  ArrowLeft,
  BarChart3,
  Filter,
  ChevronDown,
  Search,
  Grid,
  List,
  Edit,
  Ban,
  UserCheck,
  Star,
} from "lucide-react"
import AdminLayout from "../../../Components/admin-layout"
import { useParams } from "next/navigation"
// Sample user data
// const userData = {
//   id: 1,
//   name: "Thomas Dupont",
//   email: "thomas.dupont@example.com",
//   phone: "06 12 34 56 78",
//   city: "Lyon, 69003",
//   joinDate: "12/04/2023",
//   lastLogin: "Today, 10:30",
//   status: "active",
//   avatar: null,
//   bio: "Passionné de technologie et de sport. J'aime trouver de bonnes affaires et donner une seconde vie aux objets.",
//   productsCount: 12,
//   purchasesCount: 8,
//   favoritesCount: 15,
//   messagesCount: 24,
//   viewsCount: 156,
//   responseRate: 92,
//   averageResponseTime: "2.5 hours",
//   rating: 4.8,
//   reviewsCount: 15,
// }

// Sample products data
const userProducts = [
  {
    id: 1,
    title: "MacBook Pro 2021",
    price: 1200,
    category: "Électronique",
    status: "active",
    date: "15/07/2023",
    image: "/placeholder.svg?height=80&width=80",
    views: 45,
    favorites: 8,
    messages: 5,
  },
  {
    id: 2,
    title: "iPhone 13 Pro Max",
    price: 850,
    category: "Électronique",
    status: "sold",
    date: "05/07/2023",
    image: "/placeholder.svg?height=80&width=80",
    views: 78,
    favorites: 12,
    messages: 9,
  },
  {
    id: 3,
    title: "Vélo de route Decathlon",
    price: 450,
    category: "Sport",
    status: "active",
    date: "10/07/2023",
    image: "/placeholder.svg?height=80&width=80",
    views: 32,
    favorites: 5,
    messages: 3,
  },
]

// Sample purchases data
const userPurchases = [
  {
    id: 101,
    title: "Canapé d'angle convertible",
    price: 350,
    seller: "Marie Laurent",
    date: "20/06/2023",
    status: "completed",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 102,
    title: "Table à manger en bois",
    price: 180,
    seller: "Lucas Bernard",
    date: "15/05/2023",
    status: "completed",
    image: "/placeholder.svg?height=80&width=80",
  },
]

// Sample favorites data
const userFavorites = [
  {
    id: 201,
    title: "Appareil photo Canon EOS",
    price: 550,
    seller: "Sophie Martin",
    date: "25/07/2023",
    status: "active",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 202,
    title: "Nintendo Switch",
    price: 280,
    seller: "Jean Petit",
    date: "18/07/2023",
    status: "sold",
    image: "/placeholder.svg?height=80&width=80",
  },
]

// Sample activity data
const userActivity = [
  {
    id: 1,
    type: "product_added",
    title: "MacBook Pro 2021",
    date: "15/07/2023",
    time: "14:30",
  },
  {
    id: 2,
    type: "message_sent",
    title: "Message sent to Marie Laurent",
    date: "14/07/2023",
    time: "10:15",
  },
  {
    id: 3,
    type: "product_viewed",
    title: "Canapé d'angle convertible",
    date: "13/07/2023",
    time: "16:45",
  },
  {
    id: 4,
    type: "product_favorited",
    title: "Appareil photo Canon EOS",
    date: "12/07/2023",
    time: "09:20",
  },
  {
    id: 5,
    type: "product_purchased",
    title: "Table à manger en bois",
    date: "10/07/2023",
    time: "11:30",
  },
]

// Sample monthly activity data for chart
const monthlyActivity = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "Products Added",
      data: [1, 2, 0, 3, 1, 2, 3, 0, 0, 0, 0, 0],
    },
    {
      label: "Products Purchased",
      data: [0, 1, 2, 0, 1, 1, 3, 0, 0, 0, 0, 0],
    },
    {
      label: "Messages Sent",
      data: [3, 5, 2, 4, 3, 2, 5, 0, 0, 0, 0, 0],
    },
  ],
}

export default function UserDetailPage() {
  const router = useRouter()
  const params = useParams()
  const userId = params.id
  const [activeTab, setActiveTab] = useState("overview")
  const [productViewMode, setProductViewMode] = useState("grid")
  const [productStatusFilter, setProductStatusFilter] = useState("all")
  const [productSearchQuery, setProductSearchQuery] = useState("")
  const [userData, setUser] = useState([])
  
  useEffect(()=>{
      const fetchUsers = async () => {
        try{
        const token=Cookies.get("access_token")
        const response= await ClientAxios.get(`/api/users/${userId}`,{
            headers: {
                "Authorization": `Bearer ${token}` , 
                "Accept": "application/json",
            }
          })
          console.log(response.data)
          const user=response.data.user
          setUser({
            id: user.id,
            name: user.name,
            email: user.email,
            productsCount: user.productsCount || 0,
            status: user.status || "active",
            joinDate: new Date(user.joinDate).toLocaleDateString(),
            city: user.city || "Unknown",
            lastLogin: new Date(user.last_login).toLocaleDateString()|| "00/00/0000",
            phone: user.phone || "Unknown",
            productsCount: response.data.productsCount || 0,
            purchasesCount: 8,
            favoritesCount: 15,
            messagesCount: 24,
            viewsCount: 156,

        })
        }
        catch(error){
          console.error("Error fetching users:", error)
        }
  
      }
      fetchUsers();
  },[userId])
  // Status badge component
  const StatusBadge = ({ status }) => {
    let colorClasses = "bg-gray-100 text-gray-800"

    if (status === "active") {
      colorClasses = "bg-green-100 text-green-800"
    } else if (status === "suspended") {
      colorClasses = "bg-red-100 text-red-800"
    } else if (status === "pending") {
      colorClasses = "bg-yellow-100 text-yellow-800"
    } else if (status === "completed") {
      colorClasses = "bg-blue-100 text-blue-800"
    } else if (status === "sold") {
      colorClasses = "bg-purple-100 text-purple-800"
    }

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses}`}>
        {status}
      </span>
    )
  }

  // Filter products based on search query and status
  const filteredProducts = userProducts.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(productSearchQuery.toLowerCase())
    const matchesStatus = productStatusFilter === "all" || product.status === productStatusFilter
    return matchesSearch && matchesStatus
  })

  // Activity icon component
  const ActivityIcon = ({ type }) => {
    switch (type) {
      case "product_added":
        return <Package className="h-4 w-4 text-green-500" />
      case "message_sent":
        return <MessageSquare className="h-4 w-4 text-blue-500" />
      case "product_viewed":
        return <Eye className="h-4 w-4 text-gray-500" />
      case "product_favorited":
        return <Heart className="h-4 w-4 text-red-500" />
      case "product_purchased":
        return <ShoppingCart className="h-4 w-4 text-purple-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center mb-6">
          <button
            onClick={() => router.push("/admin/users")}
            className="mr-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">User Profile</h1>
        </div>

        {/* User Profile Header */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center">
              <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                  {userData.avatar ? (
                    <img
                      src={userData.avatar || "/placeholder.svg"}
                      alt={userData.name}
                      className="h-24 w-24 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-12 w-12 text-gray-500" />
                  )}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{userData.name}</h2>
                    <p className="text-gray-500 mt-1">User ID: #{userData.id}</p>
                  </div>
                  <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
                    <button className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </button>
                    {userData.status === "active" ? (
                      <button className="flex items-center px-3 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors">
                        <Ban className="h-4 w-4 mr-2" />
                        Suspend User
                      </button>
                    ) : (
                      <button className="flex items-center px-3 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors">
                        <UserCheck className="h-4 w-4 mr-2" />
                        Activate User
                      </button>
                    )}
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-700">{userData.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-700">{userData.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-700">{userData.city}</span>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-700">Joined: {userData.joinDate}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-700">Last login: {userData.lastLogin}</span>
                  </div>
                  <div className="flex items-center">
                    <StatusBadge status={userData.status} />
                  </div>
                </div>
              </div>
            </div>
            {userData.bio && (
              <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">Bio</h3>
                <p className="text-gray-700">{userData.bio}</p>
              </div>
            )}
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              {[
                { id: "overview", label: "Overview" },
                { id: "products", label: "Products" },
                { id: "purchases", label: "Purchases" },
                { id: "favorites", label: "Favorites" },
                { id: "activity", label: "Activity" },
                { id: "statistics", label: "Statistics" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-4 text-sm font-medium whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-b-2 border-orange-500 text-orange-600"
                      : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <>
              {/* User Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  {
                    title: "Products Listed",
                    value: userData.productsCount,
                    icon: <Package className="h-5 w-5 text-blue-500" />,
                  },
                  {
                    title: "Purchases Made",
                    value: userData.purchasesCount,
                    icon: <ShoppingCart className="h-5 w-5 text-green-500" />,
                  },
                  {
                    title: "Favorites",
                    value: userData.favoritesCount,
                    icon: <Heart className="h-5 w-5 text-red-500" />,
                  },
                  {
                    title: "Messages",
                    value: userData.messagesCount,
                    icon: <MessageSquare className="h-5 w-5 text-purple-500" />,
                  },
                ].map((stat, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                      </div>
                      <div className="p-2 bg-gray-50 rounded-lg">{stat.icon}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* User Performance */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">User Performance</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-500">Profile Views</span>
                        <span className="text-sm font-medium text-gray-900">{userData.viewsCount}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5">
                        <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "75%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-500">Response Rate</span>
                        <span className="text-sm font-medium text-gray-900">{userData.responseRate}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5">
                        <div
                          className="bg-green-500 h-2.5 rounded-full"
                          style={{ width: `${userData.responseRate}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-500">Rating</span>
                        <span className="text-sm font-medium text-gray-900">
                          {userData.rating} ({userData.reviewsCount} reviews)
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5">
                        <div
                          className="bg-orange-500 h-2.5 rounded-full"
                          style={{ width: `${(userData.rating / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                    <button
                      onClick={() => setActiveTab("activity")}
                      className="text-sm text-orange-500 hover:text-orange-600 font-medium"
                    >
                      View All
                    </button>
                  </div>
                  <div className="space-y-4">
                    {userActivity.slice(0, 5).map((activity) => (
                      <div key={activity.id} className="flex items-start">
                        <div className="flex-shrink-0 mr-3">
                          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <ActivityIcon type={activity.type} />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                          <p className="text-xs text-gray-500">
                            {activity.date} at {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Products Tab */}
          {activeTab === "products" && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">User Products</h2>
                  <div className="mt-3 sm:mt-0 flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={productSearchQuery}
                        onChange={(e) => setProductSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-200 rounded-lg focus:border-orange-300 focus:ring focus:ring-orange-100"
                      />
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Filter className="h-4 w-4 text-gray-400" />
                      </div>
                      <select
                        value={productStatusFilter}
                        onChange={(e) => setProductStatusFilter(e.target.value)}
                        className="pl-10 pr-8 py-2 w-full sm:w-40 border border-gray-200 rounded-lg focus:border-orange-300 focus:ring focus:ring-orange-100 appearance-none"
                      >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="sold">Sold</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setProductViewMode("grid")}
                        className={`p-1.5 rounded-md ${
                          productViewMode === "grid"
                            ? "bg-orange-100 text-orange-600"
                            : "text-gray-400 hover:text-gray-600"
                        }`}
                      >
                        <Grid className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setProductViewMode("list")}
                        className={`p-1.5 rounded-md ${
                          productViewMode === "list"
                            ? "bg-orange-100 text-orange-600"
                            : "text-gray-400 hover:text-gray-600"
                        }`}
                      >
                        <List className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {productViewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <div className="relative h-40 bg-gray-100">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <StatusBadge status={product.status} />
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-gray-900 mb-1">{product.title}</h3>
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-bold text-orange-500">{product.price} €</div>
                          <div className="text-xs text-gray-500">{product.category}</div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                          <div>Added: {product.date}</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-3 text-xs text-gray-500">
                            <div className="flex items-center">
                              <Eye className="h-3 w-3 mr-1" />
                              {product.views}
                            </div>
                            <div className="flex items-center">
                              <Heart className="h-3 w-3 mr-1" />
                              {product.favorites}
                            </div>
                            <div className="flex items-center">
                              <MessageSquare className="h-3 w-3 mr-1" />
                              {product.messages}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Product
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Category
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
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
                          Stats
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredProducts.map((product) => (
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
                                <div className="text-xs text-gray-500">ID: #{product.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{product.price} €</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <StatusBadge status={product.status} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex space-x-3 text-xs text-gray-500">
                              <div className="flex items-center">
                                <Eye className="h-3 w-3 mr-1" />
                                {product.views}
                              </div>
                              <div className="flex items-center">
                                <Heart className="h-3 w-3 mr-1" />
                                {product.favorites}
                              </div>
                              <div className="flex items-center">
                                <MessageSquare className="h-3 w-3 mr-1" />
                                {product.messages}
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {filteredProducts.length === 0 && (
                <div className="text-center py-12 text-gray-500">No products found matching your criteria</div>
              )}
            </div>
          )}

          {/* Purchases Tab */}
          {activeTab === "purchases" && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">User Purchases</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Product
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Seller
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {userPurchases.map((purchase) => (
                      <tr key={purchase.id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 rounded-md overflow-hidden">
                              <img
                                src={purchase.image || "/placeholder.svg"}
                                alt={purchase.title}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{purchase.title}</div>
                              <div className="text-xs text-gray-500">ID: #{purchase.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{purchase.seller}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{purchase.price} €</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={purchase.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{purchase.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {userPurchases.length === 0 && <div className="text-center py-12 text-gray-500">No purchases found</div>}
            </div>
          )}

          {/* Favorites Tab */}
          {activeTab === "favorites" && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">User Favorites</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                {userFavorites.map((favorite) => (
                  <div
                    key={favorite.id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <div className="relative h-40 bg-gray-100">
                      <img
                        src={favorite.image || "/placeholder.svg"}
                        alt={favorite.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <StatusBadge status={favorite.status} />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 mb-1">{favorite.title}</h3>
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-bold text-orange-500">{favorite.price} €</div>
                        <div className="text-xs text-gray-500">Seller: {favorite.seller}</div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div>Added to favorites: {favorite.date}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {userFavorites.length === 0 && <div className="text-center py-12 text-gray-500">No favorites found</div>}
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === "activity" && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">User Activity</h2>
              </div>

              <div className="p-6">
                <div className="space-y-6">
                  {userActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start">
                      <div className="flex-shrink-0 mr-3">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <ActivityIcon type={activity.type} />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0 bg-gray-50 rounded-lg p-4">
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {activity.date} at {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {userActivity.length === 0 && <div className="text-center py-12 text-gray-500">No activity found</div>}
            </div>
          )}

          {/* Statistics Tab */}
          {activeTab === "statistics" && (
            <div className="space-y-6">
              {/* User Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    title: "Profile Views",
                    value: userData.viewsCount,
                    icon: <Eye className="h-5 w-5 text-blue-500" />,
                    change: "+12% this month",
                  },
                  {
                    title: "Response Rate",
                    value: `${userData.responseRate}%`,
                    icon: <MessageSquare className="h-5 w-5 text-green-500" />,
                    change: "+5% this month",
                  },
                  {
                    title: "Avg. Response Time",
                    value: userData.averageResponseTime,
                    icon: <Clock className="h-5 w-5 text-orange-500" />,
                    change: "-10% this month",
                  },
                  {
                    title: "Rating",
                    value: userData.rating,
                    icon: <Star className="h-5 w-5 text-yellow-500" />,
                    change: `${userData.reviewsCount} reviews`,
                  },
                ].map((stat, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                        <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                      </div>
                      <div className="p-2 bg-gray-50 rounded-lg">{stat.icon}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Monthly Activity Chart */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Activity</h2>
                  <div className="h-80">
                    <div className="flex h-full items-center justify-center">
                      <div className="text-center p-6 bg-gray-50 rounded-lg">
                        <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">
                          Chart visualization would appear here showing the user's monthly activity trends
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Engagement Metrics */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">User Engagement Metrics</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-3">Activity Distribution</h3>
                      <div className="space-y-4">
                        {[
                          { label: "Product Listings", value: 35, color: "bg-blue-500" },
                          { label: "Messages Sent", value: 25, color: "bg-green-500" },
                          { label: "Product Views", value: 20, color: "bg-purple-500" },
                          { label: "Favorites", value: 15, color: "bg-orange-500" },
                          { label: "Purchases", value: 5, color: "bg-red-500" },
                        ].map((item, index) => (
                          <div key={index}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm text-gray-700">{item.label}</span>
                              <span className="text-sm font-medium text-gray-900">{item.value}%</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                              <div
                                className={`${item.color} h-2 rounded-full`}
                                style={{ width: `${item.value}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-3">User Behavior</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-700">Active Days</span>
                            <span className="text-sm font-medium text-gray-900">5 days/week</span>
                          </div>
                          <div className="flex space-x-1">
                            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                              <div
                                key={index}
                                className={`flex-1 h-8 rounded-md flex items-center justify-center text-xs ${
                                  index < 5 ? "bg-orange-100 text-orange-800" : "bg-gray-100 text-gray-400"
                                }`}
                              >
                                {day[0]}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-700">Peak Activity Hours</span>
                          </div>
                          <div className="h-20 flex items-end space-x-1">
                            {[2, 5, 8, 15, 25, 40, 65, 80, 70, 60, 45, 30, 20, 15, 10, 5, 2, 1, 0, 0, 3, 8, 12, 5].map(
                              (value, index) => (
                                <div
                                  key={index}
                                  className="flex-1 bg-orange-500 rounded-t-sm"
                                  style={{ height: `${value}%` }}
                                ></div>
                              ),
                            )}
                          </div>
                          <div className="flex justify-between mt-1 text-xs text-gray-500">
                            <span>00:00</span>
                            <span>12:00</span>
                            <span>23:59</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Performance */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Product Performance</h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Product
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Views
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Favorites
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Messages
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Conversion Rate
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {userProducts.map((product) => {
                          // Calculate a fake conversion rate
                          const conversionRate = ((product.messages / product.views) * 100).toFixed(1)
                          return (
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
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.views}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.favorites}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.messages}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <span
                                    className={`text-sm font-medium ${
                                      Number.parseFloat(conversionRate) > 10
                                        ? "text-green-600"
                                        : Number.parseFloat(conversionRate) > 5
                                          ? "text-orange-600"
                                          : "text-gray-600"
                                    }`}
                                  >
                                    {conversionRate}%
                                  </span>
                                  <div className="ml-2 w-16 bg-gray-100 rounded-full h-1.5">
                                    <div
                                      className={`h-1.5 rounded-full ${
                                        Number.parseFloat(conversionRate) > 10
                                          ? "bg-green-500"
                                          : Number.parseFloat(conversionRate) > 5
                                            ? "bg-orange-500"
                                            : "bg-gray-400"
                                      }`}
                                      style={{ width: `${Math.min(Number.parseFloat(conversionRate) * 5, 100)}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
