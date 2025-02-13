import NavBar from "../Components/NavbarSecond";

export default function Login() {
  return (
    <div>
      <NavBar />
      <div className="max-h-screen p-4 mt-20 md:p-6 flex items-center justify-center">
        <div className="mx-auto max-w-md w-full">
          <div className="space-y-8">
            {/* Form Section */}
            <h1 className="text-2xl font-semibold text-gray-900 md:text-3xl text-center">
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

              <button
                type="submit"
                className="w-full rounded-md bg-[#FF6E14] px-4 py-3 text-center font-semibold text-white hover:bg-[#e66412] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Se connecter
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
                Créer un compte
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
