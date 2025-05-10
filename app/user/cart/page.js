"use client"

import { useState , useEffect } from "react"
import Image from "next/image"
import { Trash2 } from "lucide-react" 
import Cookies from "js-cookie"
import axios from "axios"
// import NavBar from "../../Components/NavBar"
import NavBar from "../../Components/NavbarSecond"
import { get } from "http"
import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"

// Sample cart data 

const initialCartItems = [
  // {
  //   id: 1,
  //   name: "Handcrafted Wooden Bowl",
  //   price: 25.99,
  //   image: "/placeholder.svg?height=80&width=80",
  // },
  // {
  //   id: 2,
  //   name: "Local Honey (16oz)",
  //   price: 12.5,
  //   image: "/placeholder.svg?height=80&width=80",
  // },
  // {
  //   id: 3,
  //   name: "Artisan Bread Loaf",
  //   price: 6.75,
  //   image: "/placeholder.svg?height=80&width=80",
  // },
] 
export default function Page() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [isLoading, setIsLoading] = useState(true);

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const total = subtotal; // In a real app, you might add tax, shipping, etc.

  const getCart = async () => {
    try {
      setIsLoading(true); // Set loading to true before fetching data
      const token = Cookies.get("access_token"); // Retrieve the token from cookies
      const response = await axios.get(
        "http://127.0.0.1:8000/api/cart",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`, // Use the token from cookies
          },
        }
      );

      // Map the fetched data to match the cartItems structure
      const fetchedCartItems = response.data.cart.map((item) => ({
        id: item.product.id,
        name: item.product.nom,
        price: parseFloat(item.product.prix),
        image: item.product.image[0]?.url || "/placeholder.svg",
      }));

      setCartItems(fetchedCartItems);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
      setIsLoading(false); // Set loading to false after fetching data
    }
  };

  const remove = async (id) => { 
    console.log(id) 
    try {
      const token = Cookies.get("access_token"); // Retrieve the token from cookies
      await axios.delete(
        `http://127.0.0.1:8000/api/cart/remove/${id}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`, // Use the token from cookies
          },
        }
      )
      setCartItems(cartItems.filter((item) => item.id !== id));
    }  
    catch (error) {
console.error("Error removing item from cart:", error);
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl"> 
    <NavBar />
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center md:text-left text-orange-600">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">Your cart is empty</p>
          <Link href={"/products"}>
          <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg shadow-md transition-all">
            Continue Shopping
          </button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-grow">
            <div className="overflow-hidden rounded-xl shadow-lg bg-white">
              <div className="divide-y">
                {cartItems.map((item) => (
                  <Link href={"/products/" + item.id} key={item.id} >
                  <div  className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-all">
                    <div className="shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded-md object-cover border border-gray-200"
                        />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">Quantity: 1</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-800">${item.price.toFixed(2)}</p>
                      <button 
                      onClick={()=>remove(item.id)}
                      // onClick={() => removeItem(item.id)}
                      className="text-orange-500 hover:text-orange-700 text-sm mt-1 flex items-center gap-1"
                      >
                        <Trash2 size={16} />
                        <span  >Remove</span>
                      </button>
                    </div>
                  </div>
                        </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="w-full lg:w-80">
            <div className="p-6 rounded-xl shadow-lg bg-white">
              <h2 className="font-bold text-xl mb-4 text-gray-800">Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-800">${subtotal.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-bold text-gray-800">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg shadow-md transition-all">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
