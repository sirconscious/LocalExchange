import NavBar from "../Components/NavbarSecond";
import Link from "next/link";
export default function SignUp() {
  return (
    <div>
      <NavBar />
      <div className="max-h-screen p-4 mt-20 md:p-6 flex items-center justify-center">
        <div className="mx-auto max-w-md w-full">
          <div className="space-y-8">
            {/* Form Section */}
            <h1 className="text-2xl font-semibold text-gray-900 md:text-3xl text-center">
              Créez votre compte pour le marché d'échanges locaux
            </h1>

            <form className="space-y-6">
              {/* Full Name Field */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nom complet <span className="text-gray-400">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>

              {/* Email Field */}
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

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Mot de passe <span className="text-gray-400">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirmez le mot de passe <span className="text-gray-400">*</span>
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>

              {/* City Field (Optional) */}
              <div className="space-y-2">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  Ville <span className="text-gray-400">*</span>
                </label>
                <input
                  type="text"
                  id="city"
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                className="w-full rounded-md hover:border-gray-500 border bg-[#FF6E14] transition-all px-4 py-3 text-center font-semibold text-white hover:bg-[#e66412] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Créer un compte
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-4 text-sm text-gray-500">Ou</span>
                </div>
              </div>

              {/* Login Button */}
              <Link href="login" className="block">
              <button
                type="button"
                className="w-full rounded-md bg-white  transition-all hover:text-white border border-orange-500 px-4 py-3 text-center font-semibold text-orange-500 hover:bg-[#FF6E14] focus:outline-none  "
              >
                Se connecter
              </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}