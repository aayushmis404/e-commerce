"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import Button from "../ui/Button"
import Input from "../ui/Input"
import Modal from "../ui/Modal"
import { useAuth } from "../../contexts/AuthContext"
import { useToast } from "../../contexts/ToastContext"

const AuthModal = ({ isOpen, onClose, mode, onModeChange }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const { addToast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.target)
    const email = formData.get("email")
    const password = formData.get("password")
    const name = formData.get("name")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (mode === "login") {
      login({ id: "1", name: email.split("@")[0], email })
      addToast("Welcome back!", "success")
    } else {
      login({ id: "1", name: name || email.split("@")[0], email })
      addToast("Account created! Welcome to EasyShop!", "success")
    }

    setIsLoading(false)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={mode === "login" ? "Sign In" : "Create Account"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "signup" && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <Input id="name" name="name" type="text" required placeholder="Enter your full name" />
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <Input id="email" name="email" type="email" required placeholder="Enter your email" />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
        </Button>
      </form>

      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          {mode === "login" ? "Don't have an account?" : "Already have an account?"}
          <button
            type="button"
            className="ml-1 text-blue-600 hover:text-blue-500"
            onClick={() => onModeChange(mode === "login" ? "signup" : "login")}
          >
            {mode === "login" ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </Modal>
  )
}

export default AuthModal
