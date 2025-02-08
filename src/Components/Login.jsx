import React from "react"
export default function LoginPage() {
    return (
      <div className="min-h-screen bg-white p-4 md:p-6">
        <div className="mx-auto max-w-6xl">
          {/* Back button */}
          <button className="mb-8 text-[#FF6E14]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
  
          <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
            {/* Form Section */}
            <div className="space-y-8">
              <h1 className="text-2xl font-semibold text-gray-900 md:text-3xl">
                Connectez-vous ou créez votre compte leboncoin
              </h1>
  
              <form className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    E-mail <span className="text-gray-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
  
                <button
                  type="submit"
                  className="w-full rounded-md bg-[#FF6E14] px-4 py-3 text-center font-semibold text-white hover:bg-[#e66412] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                  Continuer
                </button>
  
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-4 text-sm text-gray-500">Ou</span>
                  </div>
                </div>
  
                <button
                  type="button"
                  className="w-full rounded-md bg-[#FF6E14] px-4 py-3 text-center font-semibold text-white hover:bg-[#e66412] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                  Se Connecter
                </button>
              </form>
            </div>
  
            {/* Illustrations Grid */}
            <div className="hidden grid-cols-2 gap-4 md:grid">
              <div className="aspect-square rounded-2xl bg-[#E6E1F4] p-8">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame-5LhWc2VpSRbE7vd9qyCNS1omOXH7Fo.png"
                  alt="House illustration"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="aspect-square rounded-2xl bg-[#E1F4F3] p-8">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame-5LhWc2VpSRbE7vd9qyCNS1omOXH7Fo.png"
                  alt="Briefcase illustration"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="aspect-square rounded-2xl bg-[#FFE8E5] p-8">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame-5LhWc2VpSRbE7vd9qyCNS1omOXH7Fo.png"
                  alt="Car illustration"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="aspect-square rounded-2xl bg-[#E1E6F4] p-8">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame-5LhWc2VpSRbE7vd9qyCNS1omOXH7Fo.png"
                  alt="Jacket illustration"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  