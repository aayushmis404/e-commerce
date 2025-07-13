"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Minus, Plus, Trash2, ShoppingBag, Lock, User } from "lucide-react"
import Button from "../components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card"
import { useCart } from "../contexts/CartContext"
import { useAuth } from "../contexts/AuthContext"
import { formatPrice } from "../utils/helpers"
import AuthModal from "../components/auth/AuthModal"


const CartPage = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState("login")
  const [showGuestCheckout, setShowGuestCheckout] = useState(false)
  const [guestInfo, setGuestInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
  })

  const { items, updateQuantity, removeItem, getCartTotal } = useCart()
  const { user } = useAuth()

  const handleAuthClick = (mode) => {
    setAuthMode(mode)
    setIsAuthModalOpen(true)
  }

  const handleGuestInfoChange = (field, value) => {
    setGuestInfo((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const isGuestInfoComplete = guestInfo.email && guestInfo.firstName && guestInfo.lastName

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to get started!</p>
          <Link to="/">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  const shipping = 99
  const tax = getCartTotal() * 0.18 // 18% GST for India

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={`${item.id}-${item.name}`}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900 truncate">{item.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{formatPrice(item.price)} each</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="p-2"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-12 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="text-lg font-medium text-gray-900">{formatPrice(item.price * item.quantity)}</div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(getCartTotal())}</span>
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
                  <span>{formatPrice(getCartTotal() + shipping )}</span>
                </div>
              </CardContent>
            </Card>

            {/* Authentication Section - Only show if not logged in */}
            {!user && (
              <Card className="border-2 border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-800">
                    <User className="w-5 h-5 mr-2" />
                    Sign In to Continue
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">Have an account?</h3>
                        <p className="text-sm text-gray-600">Sign in for faster checkout</p>
                      </div>
                      <Lock className="w-8 h-8 text-blue-600" />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button className="flex-1" onClick={() => handleAuthClick("login")}>
                        Sign In
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={() => handleAuthClick("signup")}
                      >
                        Create Account
                      </Button>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-blue-50 text-gray-500">or</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">Continue as Guest</h3>
                        <p className="text-sm text-gray-600">Checkout without an account</p>
                      </div>
                    </div>

                    {!showGuestCheckout ? (
                      <Button
                        variant="outline"
                        className="w-full bg-transparent"
                        onClick={() => setShowGuestCheckout(true)}
                      >
                        Continue as Guest
                      </Button>
                    ) : (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="First Name"
                            value={guestInfo.firstName}
                            onChange={(e) => handleGuestInfoChange("firstName", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            required
                          />
                          <input
                            type="text"
                            placeholder="Last Name"
                            value={guestInfo.lastName}
                            onChange={(e) => handleGuestInfoChange("lastName", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            required
                          />
                        </div>
                        <input
                          type="email"
                          placeholder="Email Address"
                          value={guestInfo.email}
                          onChange={(e) => handleGuestInfoChange("email", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          required
                        />
                        <div className="flex gap-2 items-center">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setShowGuestCheckout(false)
                              setGuestInfo({ email: "", firstName: "", lastName: "" })
                            }}
                            className="bg-transparent"
                          >
                            Back
                          </Button>
                          {isGuestInfoComplete && (
                            <span className="text-sm text-green-600 flex items-center">✓ Ready to checkout</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Checkout Button */}
            {user ? (
              <div className="space-y-3">
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center">
                    <User className="w-5 h-5 text-green-600 mr-2" />
                    <p className="text-sm text-green-800">
                      Signed in as <span className="font-medium">{user.name}</span>
                    </p>
                  </div>
                </div>
                <Link to="/checkout" className="w-full">
                  <Button className="w-full" size="lg">
                    Proceed to Checkout
                  </Button>
                </Link>
              </div>
            ) : isGuestInfoComplete ? (
              <div className="space-y-3">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-center">
                    <User className="w-5 h-5 text-blue-600 mr-2" />
                    <p className="text-sm text-blue-800">
                      Continuing as{" "}
                      <span className="font-medium">
                        {guestInfo.firstName} {guestInfo.lastName}
                      </span>
                    </p>
                  </div>
                </div>
                <Link to="/checkout" state={{ guestInfo }} className="w-full">
                  <Button className="w-full" size="lg">
                    Proceed to Checkout
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="flex items-center">
                    <Lock className="w-5 h-5 text-yellow-600 mr-2" />
                    <p className="text-sm text-yellow-800">Please sign in or provide guest information to continue</p>
                  </div>
                </div>
                <Button className="w-full" size="lg" disabled>
                  <Lock className="w-4 h-4 mr-2" />
                  Sign In Required
                </Button>
              </div>
            )}

            <Link to="/" className="w-full">
              <Button variant="outline" className="w-full bg-transparent">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </div>
  )
}

export default CartPage
