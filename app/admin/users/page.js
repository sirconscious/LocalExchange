"use client"

import { useState } from "react"
import { Users, Search, Filter, ChevronDown, Eye, Ban, User } from "lucide-react"
import AdminLayout from "../../Components/admin-layout"

// Sample data for users
const usersData = [
  {
    id: 1,
    name: "Thomas Dupont",
    email: "thomas.dupont@example.com",
    productsCount: 12,
    status: "active",
    joinDate: "12/04/2023",
    location: "Lyon, 69003",
    lastLogin: "Today, 10:30",
    phone: "06 12 34 56 78",
  },
  {
    id: 2,
    name: "Marie Laurent",
    email: "marie.laurent@example.com",
    productsCount: 8,
    status: "active",
    joinDate: "23/05/2023",
    location: "Paris, 75011",
    lastLogin: "Yesterday, 15:45",
    phone: "07 23 45 67 89",
  },
  {
    id: 3,
    name: "Jean Petit",
    email: "jean.petit@example.com",
    productsCount: 5,
    status: "suspended",
    joinDate: "05/02/2023",
    location: "Marseille, 13008",
    lastLogin: "3 days ago",
    phone: "06 34 56 78 90",
  },
  {
    id: 4,
    name: "Sophie Martin",
    email: "sophie.martin@example.com",
    productsCount: 15,
    status: "active",
    joinDate: "18/01/2023",
    location: "Bordeaux, 33000",
    lastLogin: "Today, 08:15",
    phone: "07 45 67 89 01",
  },
  {
    id: 5,
    name: "Lucas Bernard",
    email: "lucas.bernard@example.com",
    productsCount: 3,
    status: "pending",
    joinDate: "30/06/2023",
    location: "Lille, 59000",
    lastLogin: "1 week ago",
    phone: "06 56 78 90 12",
  },
]

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter users based on search query and status
  const filteredUsers = usersData.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Status badge component
  const StatusBadge = ({ status }) => {
    let colorClasses = "bg-gray-100 text-gray-800"

    if (status === "active") {
      colorClasses = "bg-green-100 text-green-800"
    } else if (status === "suspended") {
      colorClasses = "bg-red-100 text-red-800"
    } else if (status === "pending") {
      colorClasses = "bg-yellow-100 text-yellow-800"
    }

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center mb-6">
          <Users className="h-6 w-6 text-orange-500 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">Users Management</h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-semibold text-gray-900">All Users</h2>
              <div className="mt-3 sm:mt-0 flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search users..."
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
                    <option value="suspended">Suspended</option>
                    <option value="pending">Pending</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    User
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Contact
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Location
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Products
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
                    Last Login
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">ID: #{user.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                      <div className="text-sm text-gray-500">{user.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.productsCount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={user.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastLogin}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-800" title="View User">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          className={`${
                            user.status === "suspended"
                              ? "text-green-600 hover:text-green-800"
                              : "text-red-600 hover:text-red-800"
                          }`}
                          title={user.status === "suspended" ? "Activate User" : "Suspend User"}
                        >
                          <Ban className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredUsers.length === 0 && (
              <div className="text-center py-6 text-gray-500">No users found matching your criteria</div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
