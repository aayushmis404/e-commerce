"use client"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { CreditCard, MapPin, Package, AlertCircle } from "lucide-react"
import Button from "../components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card"
import Input from "../components/ui/Input"
import { useCart } from "../contexts/CartContext"
import { useAuth } from "../contexts/AuthContext"
import { useToast } from "../contexts/ToastContext"
import { formatPrice } from "../utils/helpers"

const CheckoutPage = () => {
  const [isProcessing, setIsProcessing] = useState(false)
  const { items, getCartTotal, clearCart } = useCart()
  const { user } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  // Get guest info from navigation state (if coming from cart as guest)
  const guestInfo = location.state?.guestInfo

  // Redirect if not authenticated and no guest info
  useEffect(() => {
    if (!user && !guestInfo) {
      addToast("Please login or provide guest information to proceed with checkout", "error")
      navigate("/cart")
    }
  }, [user, guestInfo, navigate, addToast])

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      addToast("Your cart is empty", "error")
      navigate("/")
    }
  }, [items.length, navigate, addToast])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      if (user) {
        addToast(`Order placed successfully! Thank you ${user.name}!`, "success")
      } else if (guestInfo) {
        addToast(`Order placed successfully! Thank you ${guestInfo.firstName}!`, "success")
      }

      clearCart()
      navigate("/")
    } catch (error) {
      addToast("Payment failed. Please try again.", "error")
    } finally {
      setIsProcessing(false)
    }
  }

  // Show loading or redirect if not authenticated
  if (!user && !guestInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Required</h2>
          <p className="text-gray-600 mb-6">Redirecting to cart...</p>
        </div>
      </div>
    )
  }

  // Show message if cart is empty
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Cart is Empty</h2>
          <p className="text-gray-600 mb-6">Add some products to proceed with checkout</p>
          <Button onClick={() => navigate("/")}>Continue Shopping</Button>
        </div>
      </div>
    )
  }

  const subtotal = getCartTotal()
  const shipping = 99
  const tax = subtotal * 0.18 // 18% GST
  const total = subtotal + shipping + tax

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          {user ? (
            <p className="text-gray-600 mt-2">
              Logged in as: <span className="font-medium text-blue-600">{user.email}</span>
            </p>
          ) : guestInfo ? (
            <p className="text-gray-600 mt-2">
              Guest checkout: <span className="font-medium text-blue-600">{guestInfo.email}</span>
            </p>
          ) : null}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <div className="space-y-6">
              {/* Shipping Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <Input
                        id="firstName"
                        required
                        defaultValue={user?.name?.split(" ")[0] || guestInfo?.firstName || ""}
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <Input
                        id="lastName"
                        required
                        defaultValue={user?.name?.split(" ")[1] || guestInfo?.lastName || ""}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      required
                      defaultValue={user?.email || guestInfo?.email || ""}
                      readOnly
                      className="bg-gray-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <Input id="address" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <Input id="city" required />
                    </div>
                    <div>
                      <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
                        PIN Code
                      </label>
                      <Input id="pincode" required />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <Input id="state" required />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <Input id="phone" type="tel" required />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <Input id="expiry" placeholder="MM/YY" required />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <Input id="cvv" placeholder="123" required />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                      Name on Card
                    </label>
                    <Input
                      id="cardName"
                      required
                      defaultValue={user?.name || `${guestInfo?.firstName || ""} ${guestInfo?.lastName || ""}`}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Package className="w-5 h-5 mr-2" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.name}`} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}

                  <hr />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{formatPrice(shipping)}</span>
                    </div>
                    {/* <div className="flex justify-between">
                      <span>GST (18%)</span>
                      <span>{formatPrice(tax)}</span>
                    </div> */}
                    <hr />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
                {isProcessing ? "Processing Payment..." : `Place Order - ${formatPrice(total)}`}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CheckoutPage
