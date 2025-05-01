"use client"

import { useState } from "react"
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

// Sample data for charts
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const currentMonth = new Date().getMonth()
const last6Months = months.slice(currentMonth - 5 >= 0 ? currentMonth - 5 : 0, currentMonth + 1)

// Sample data for user registrations
const userRegistrationData = {
  labels: last6Months,
  datasets: [
    {
      label: "New Users",
      data: [65, 78, 52, 91, 43, 85],
      borderColor: "rgb(59, 130, 246)",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      tension: 0.3,
      fill: true,
    },
  ],
}

// Sample data for product listings
const productListingsData = {
  labels: last6Months,
  datasets: [
    {
      label: "New Listings",
      data: [120, 145, 110, 162, 135, 170],
      backgroundColor: "rgba(245, 158, 11, 0.8)",
      borderRadius: 6,
    },
  ],
}

// Sample data for sales by category
const salesByCategoryData = {
  labels: ["Électronique", "Ameublement", "Mode", "Sport", "Beauté & Santé", "Autres"],
  datasets: [
    {
      label: "Sales by Category",
      data: [35, 25, 15, 10, 8, 7],
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

// Sample data for user activity
const userActivityData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Active Users",
      data: [320, 420, 380, 450, 390, 280, 250],
      borderColor: "rgb(16, 185, 129)",
      backgroundColor: "rgba(16, 185, 129, 0.1)",
      tension: 0.3,
      fill: true,
    },
    {
      label: "New Messages",
      data: [120, 150, 130, 170, 140, 90, 80],
      borderColor: "rgb(245, 158, 11)",
      backgroundColor: "rgba(245, 158, 11, 0.1)",
      tension: 0.3,
      fill: true,
    },
  ],
}

// Sample data for revenue
const revenueData = {
  labels: last6Months,
  datasets: [
    {
      type: "line",
      label: "Revenue",
      data: [12500, 14200, 11800, 15600, 13900, 16800],
      borderColor: "rgb(16, 185, 129)",
      backgroundColor: "rgba(16, 185, 129, 0.1)",
      tension: 0.3,
      fill: true,
      yAxisID: "y",
    },
    {
      type: "bar",
      label: "Transactions",
      data: [85, 102, 78, 120, 95, 132],
      backgroundColor: "rgba(139, 92, 246, 0.8)",
      borderRadius: 6,
      yAxisID: "y1",
    },
  ],
}

// Sample data for device usage
const deviceUsageData = {
  labels: ["Desktop", "Mobile", "Tablet"],
  datasets: [
    {
      label: "Device Usage",
      data: [55, 35, 10],
      backgroundColor: ["rgba(59, 130, 246, 0.8)", "rgba(245, 158, 11, 0.8)", "rgba(16, 185, 129, 0.8)"],
      borderWidth: 0,
      cutout: "70%",
    },
  ],
}

export default function StatisticsPage() {
  const [timeRange, setTimeRange] = useState("6months")

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

  const mixedChartOptions = {
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
        type: "linear",
        display: true,
        position: "left",
        beginAtZero: true,
        grid: {
          drawBorder: false,
        },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        beginAtZero: true,
        grid: {
          drawOnChartArea: false,
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

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <BarChart3 className="h-6 w-6 text-orange-500 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">Statistics & Analytics</h1>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:border-orange-300 focus:ring focus:ring-orange-100 text-sm"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="6months">Last 6 Months</option>
              <option value="1year">Last Year</option>
            </select>
            <button className="flex items-center px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </button>
            <button className="flex items-center px-3 py-2 bg-orange-500 text-white rounded-lg text-sm hover:bg-orange-600 transition-colors">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            {
              title: "Total Users",
              value: "1,245",
              change: "+12.5%",
              isPositive: true,
              icon: <TrendingUp className="h-5 w-5 text-green-500" />,
            },
            {
              title: "Active Listings",
              value: "856",
              change: "+8.2%",
              isPositive: true,
              icon: <BarChart3 className="h-5 w-5 text-blue-500" />,
            },
            {
              title: "Total Sales",
              value: "€24,500",
              change: "+15.3%",
              isPositive: true,
              icon: <PieChart className="h-5 w-5 text-orange-500" />,
            },
            {
              title: "Avg. Response Time",
              value: "2.4 hrs",
              change: "-5.1%",
              isPositive: true,
              icon: <Calendar className="h-5 w-5 text-purple-500" />,
            },
          ].map((card, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">{card.icon}</div>
              </div>
              <div
                className={`mt-2 text-xs font-medium ${
                  card.isPositive ? "text-green-600" : "text-red-600"
                } flex items-center`}
              >
                {card.change}{" "}
                <span className="text-gray-500 ml-1">
                  vs. previous {timeRange === "6months" ? "6 months" : "period"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts - First Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* User Registrations Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">User Registrations</h2>
            </div>
            <div className="h-80">
              <Line options={lineChartOptions} data={userRegistrationData} />
            </div>
          </div>

          {/* Product Listings Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Product Listings</h2>
            </div>
            <div className="h-80">
              <Bar options={barChartOptions} data={productListingsData} />
            </div>
          </div>
        </div>

        {/* Charts - Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Sales by Category Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Sales by Category</h2>
            </div>
            <div className="h-64">
              <Pie options={pieChartOptions} data={salesByCategoryData} />
            </div>
          </div>

          {/* Device Usage Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Device Usage</h2>
            </div>
            <div className="h-64">
              <Doughnut options={doughnutChartOptions} data={deviceUsageData} />
            </div>
          </div>

          {/* Top Performing Categories */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Top Categories</h2>
            </div>
            <div className="space-y-4">
              {[
                { name: "Électronique", value: 35, color: "bg-blue-500" },
                { name: "Ameublement", value: 25, color: "bg-orange-500" },
                { name: "Mode", value: 15, color: "bg-green-500" },
                { name: "Sport", value: 10, color: "bg-pink-500" },
                { name: "Beauté & Santé", value: 8, color: "bg-purple-500" },
              ].map((category, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{category.name}</span>
                    <span className="text-sm font-medium text-gray-900">{category.value}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className={`${category.color} h-2 rounded-full`} style={{ width: `${category.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts - Third Row */}
        <div className="grid grid-cols-1 gap-6">
          {/* User Activity Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">User Activity</h2>
            </div>
            <div className="h-80">
              <Line options={lineChartOptions} data={userActivityData} />
            </div>
          </div>

          {/* Revenue & Transactions Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Revenue & Transactions</h2>
            </div>
            <div className="h-80">
              <Bar options={mixedChartOptions} data={revenueData} />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
