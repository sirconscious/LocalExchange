"use client"

import { useState, useEffect } from "react"
import { BarChart3, TrendingUp, PieChart, Calendar, Download, RefreshCw } from "lucide-react"
import AdminLayout from "../../Components/admin-layout"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2"
import axios from "axios"

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
)

export default function StatisticsPage() {
  const [timeRange, setTimeRange] = useState("6months")
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    total_users: 0,
    total_products: 0,
    active_products: 0,
    products_by_category: [],
    user_registrations: [],
    product_listings: [],
    daily_active_users: 0
  })
  const [userStats, setUserStats] = useState({
    user_growth: [],
    user_activity: []
  })
  const [productStats, setProductStats] = useState({
    product_growth: [],
    products_by_status: [],
    avg_products_per_user: 0
  })

  useEffect(() => {
    fetchStats()
  }, [])
  const url = "http://localhost:8000/api"
  const fetchStats = async () => {
    try {
      setLoading(true)
      const [dashboardRes, userRes, productRes] = await Promise.all([
        axios.get(`${url}/admin/statistics/dashboard`),
        axios.get(`${url}/admin/statistics/users`),
        axios.get(`${url}/admin/statistics/products`)
      ])
      
      setStats(dashboardRes.data)
      setUserStats(userRes.data)
      setProductStats(productRes.data)
    } catch (error) {
      console.error('Error fetching statistics:', error)
    } finally {
      setLoading(false)
    }
  }

  // Chart options
  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    maintainAspectRatio: false,
  }

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    maintainAspectRatio: false,
  }

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  }

  const doughnutChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  }

  // Prepare chart data
  const userRegistrationData = {
    labels: stats.user_registrations.map(item => {
      const date = new Date()
      date.setMonth(item.month - 1)
      return date.toLocaleString('default', { month: 'short' })
    }),
    datasets: [
      {
        label: "New Users",
        data: stats.user_registrations.map(item => item.total),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.3,
        fill: true,
      },
    ],
  }

  const productListingsData = {
    labels: stats.product_listings.map(item => {
      const date = new Date()
      date.setMonth(item.month - 1)
      return date.toLocaleString('default', { month: 'short' })
    }),
    datasets: [
      {
        label: "New Listings",
        data: stats.product_listings.map(item => item.total),
        backgroundColor: "rgba(245, 158, 11, 0.8)",
        borderRadius: 6,
      },
    ],
  }

  const productsByCategoryData = {
    labels: stats.products_by_category.map(item => item.category_name),
    datasets: [
      {
        label: "Products by Category",
        data: stats.products_by_category.map(item => item.total),
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(236, 72, 153, 0.8)",
          "rgba(139, 92, 246, 0.8)",
          "rgba(107, 114, 128, 0.8)",
        ],
        borderWidth: 0,
      },
    ],
  }

  const userActivityData = {
    labels: userStats.user_activity.map(item => item.day),
    datasets: [
      {
        label: "Active Users",
        data: userStats.user_activity.map(item => item.total),
        borderColor: "rgb(16, 185, 129)",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.3,
        fill: true,
      },
    ],
  }

  const productsByStatusData = {
    labels: productStats.products_by_status.map(item => item.status),
    datasets: [
      {
        label: "Products by Status",
        data: productStats.products_by_status.map(item => item.total),
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(16, 185, 129, 0.8)",
        ],
        borderWidth: 0,
        cutout: "70%",
      },
    ],
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Statistics Dashboard</h1>
          <button
            onClick={fetchStats}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Users</p>
                <p className="text-2xl font-bold">{stats.total_users}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Products</p>
                <p className="text-2xl font-bold">{stats.total_products}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <PieChart className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Products</p>
                <p className="text-2xl font-bold">{stats.active_products}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Daily Active Users</p>
                <p className="text-2xl font-bold">{stats.daily_active_users}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Registrations */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">User Registrations</h2>
            <div className="h-80">
              <Line data={userRegistrationData} options={lineChartOptions} />
            </div>
          </div>

          {/* Product Listings */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Product Listings</h2>
            <div className="h-80">
              <Bar data={productListingsData} options={barChartOptions} />
            </div>
          </div>

          {/* Products by Category */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Products by Category</h2>
            <div className="h-80">
              <Pie data={productsByCategoryData} options={pieChartOptions} />
            </div>
          </div>

          {/* User Activity */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">User Activity</h2>
            <div className="h-80">
              <Line data={userActivityData} options={lineChartOptions} />
            </div>
          </div>

          {/* Products by Status */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Products by Status</h2>
            <div className="h-80">
              <Doughnut data={productsByStatusData} options={doughnutChartOptions} />
            </div>
          </div>

          {/* Average Products per User */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Average Products per User</h2>
            <div className="flex items-center justify-center h-80">
              <p className="text-4xl font-bold text-blue-500">
                {productStats.avg_products_per_user.toFixed(1)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
