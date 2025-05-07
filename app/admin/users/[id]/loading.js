export default function Loading() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 border-4 border-t-orange-500 border-gray-200 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading user profile...</p>
        </div>
      </div>
)
}