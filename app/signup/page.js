"use client"
import NavBar from "../Components/NavbarSecond"; 
import ClientAxios from "../server/AxiosClient";
import Link from "next/link";  
import { useState } from "react";
import { useRouter } from 'next/navigation';
export default function SignUp() {  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    city: "",
    phone: "",
  });
  const router = useRouter();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { value, name } = e.target; 
    setFormData({
      ...formData, 
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: null, // Clear the error for the field being edited
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();  
    ClientAxios.post("api/register", formData)
      .then((res) => {
        console.log(res.data); 
        setErrors({}); // Clear errors on successful submission
        router.push("/login"); // Redirect to login page after successful registration
      })
      .catch((err) => {
        if (err.response && err.response.data.errors) {
          setErrors(err.response.data.errors); // Set errors from the API response
        }
      });
  };

  return ( 
    <div>
      <NavBar />
      <div className="max-h-screen p-4 mt-20 md:p-6 flex items-center justify-center">
        <div className="mx-auto max-w-md w-full">
          <div className="space-y-8">
            <h1 className="text-2xl font-semibold text-gray-900 md:text-3xl text-center">
              Créez votre compte pour le marché d'échanges locaux
            </h1>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Full Name Field */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nom complet <span className="text-gray-400">*</span>
                </label>
                <input
                  type="text" 
                  onChange={handleChange} 
                  name="name"
                  id="name"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name[0]}</span>}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  E-mail <span className="text-gray-400">*</span>
                </label>
                <input
                  type="email"
                  id="email" 
                  onChange={handleChange}
                  name="email"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email[0]}</span>}
              </div>

              {/* Phone Number Field */}
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Telephone <span className="text-gray-400">*</span>
                </label>
                <input
                  type="number"
                  id="phone" 
                  onChange={handleChange}
                  name="phone"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
                {errors.phone && <span className="text-red-500 text-sm">{errors.phone[0]}</span>}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Mot de passe <span className="text-gray-400">*</span>
                </label>
                <input
                  type="password" 
                  onChange={handleChange}
                  name="password"
                  id="password"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
                {errors.password && <span className="text-red-500 text-sm">{errors.password[0]}</span>}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                  Confirmez le mot de passe <span className="text-gray-400">*</span>
                </label>
                <input
                  type="password"
                  id="password_confirmation" 
                  onChange={handleChange}
                  name="password_confirmation"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>

              {/* City Field */}
              <div className="space-y-2">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  Ville <span className="text-gray-400">*</span>
                </label>
                <input
                  type="text"
                  id="city" 
                  name="city" 
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
                {errors.city && <span className="text-red-500 text-sm">{errors.city[0]}</span>}
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
                  className="w-full rounded-md bg-white transition-all hover:text-white border border-orange-500 px-4 py-3 text-center font-semibold text-orange-500 hover:bg-[#FF6E14] focus:outline-none"
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