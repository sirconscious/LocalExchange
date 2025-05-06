"use client"

import { useEffect, useState } from "react"
import { Package, Search, Filter, ChevronDown, Eye, Trash2 } from "lucide-react"
import AdminLayout from "../../Components/admin-layout"
import ClientAxios from "../../server/AxiosClient"

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [productsData, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ClientAxios.get("/api/products")
        const formattedProducts = response.data.data.map(product => ({
          id: product.id,
          title: product.nom,
          owner: product.owner?.name || product.vendeur || "Unknown",
          ownerId: product.vendeur_id,
          category: product.categorie,
          price: product.prix,
          status: product.etat || "active", // Default to active if no status
          date: new Date(product.dateDepot || product.created_at).toLocaleDateString(),
          description: product.description,
          views: 0, // Not in API response, defaulting to 0
          image: product.image?.length > 0 ? product.image[0] : "/placeholder.svg",
          localisation: product.localisation,
          ownerDetails: product.owner
        }))
        setProducts(formattedProducts)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProducts()
  }, [])

  // Get unique categories from products
  const categories = ["all", ...new Set(productsData.map((product) => product.category))]

  // Filter products based on search query, status, and category
  const filteredProducts = productsData.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || product.status === statusFilter
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  // Status badge component
  const StatusBadge = ({ status }) => {
    let colorClasses = "bg-gray-100 text-gray-800"

    if (status === "active") {
      colorClasses = "bg-green-100 text-green-800"
    } else if (status === "reported") {
      colorClasses = "bg-red-100 text-red-800"
    } else if (status === "sold") {
      colorClasses = "bg-blue-100 text-blue-800"
    }

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center mb-6">
          <Package className="h-6 w-6 text-orange-500 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">Products Management</h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-semibold text-gray-900">All Products</h2>
              <div className="mt-3 sm:mt-0 flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-200 rounded-lg focus:border-orange-300 focus:ring focus:ring-orange-100"
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Filter className="h-4 w-4 text-gray-400" />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="pl-10 pr-8 py-2 w-full sm:w-40 border border-gray-200 rounded-lg focus:border-orange-300 focus:ring focus:ring-orange-100 appearance-none"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="sold">Sold</option>
                    <option value="reported">Reported</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Filter className="h-4 w-4 text-gray-400" />
                  </div>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="pl-10 pr-8 py-2 w-full sm:w-40 border border-gray-200 rounded-lg focus:border-orange-300 focus:ring focus:ring-orange-100 appearance-none"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

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
                  <p className="text-sm text-gray-500 mb-2 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-bold text-orange-500">{product.price} €</div>
                    <div className="text-xs text-gray-500">ID: #{product.id}</div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <div>Owner: {product.owner}</div>
                    <div>{product.date}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">{product.views} views</div>
                    <div className="flex space-x-2">
                      <button className="p-1 text-blue-600 hover:text-blue-800" title="View Product">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-red-600 hover:text-red-800" title="Delete Product">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              {productsData.length === 0 ? "No products available" : "No products found matching your criteria"}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}