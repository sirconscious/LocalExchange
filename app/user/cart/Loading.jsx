"use client"
export default function Loading() {
    return (
      <div className="min-h-screen bg-gray-50 pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="animate-pulse">
            {/* Breadcrumb skeleton */}
            <div className="flex space-x-3 mb-6">
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
              <div className="h-4 w-4 bg-gray-200 rounded"></div>
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-4 w-4 bg-gray-200 rounded"></div>
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
            </div>
  
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="md:flex">
                {/* Image skeleton */}
                <div className="md:w-3/5">
                  <div className="h-[300px] md:h-[500px] bg-gray-200"></div>
                  <div className="flex p-2 gap-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-20 h-20 bg-gray-200 rounded-md"></div>
                    ))}
                  </div>
                </div>
  
                {/* Info skeleton */}
                <div className="md:w-2/5 p-6">
                  <div className="h-8 w-3/4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-6 w-1/3 bg-gray-200 rounded mb-6"></div>
                  <div className="h-4 w-full bg-gray-200 rounded mb-6"></div>
  
                  <div className="space-y-4 mb-6">
                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                  </div>
  
                  <div className="bg-gray-100 rounded-lg p-4 mt-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                      <div className="ml-3">
                        <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
                        <div className="h-3 w-32 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                    <div className="h-12 bg-gray-200 rounded-lg"></div>
                  </div>
                </div>
              </div>
  
              {/* Description skeleton */}
              <div className="p-6 border-t border-gray-100">
                <div className="md:flex md:gap-12">
                  <div className="md:w-3/5">
                    <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
                    <div className="space-y-3">
                      <div className="h-4 w-full bg-gray-200 rounded"></div>
                      <div className="h-4 w-full bg-gray-200 rounded"></div>
                      <div className="h-4 w-full bg-gray-200 rounded"></div>
                      <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                    </div>
                  </div>
  
                  <div className="mt-8 md:mt-0 md:w-2/5">
                    <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
                    <div className="bg-gray-100 rounded-lg p-4">
                      <div className="space-y-3">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="flex justify-between">
                            <div className="h-4 w-24 bg-gray-200 rounded"></div>
                            <div className="h-4 w-32 bg-gray-200 rounded"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
              {/* Related products skeleton */}
              <div className="p-6 border-t border-gray-100">
                <div className="h-6 w-48 bg-gray-200 rounded mb-6"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                      <div className="h-48 bg-gray-200"></div>
                      <div className="p-4">
                        <div className="h-5 w-full bg-gray-200 rounded mb-2"></div>
                        <div className="h-5 w-16 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  