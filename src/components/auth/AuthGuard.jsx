"use client"

import { useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import AuthModal from "./AuthModal"
import Button from "../ui/Button"

const AuthGuard = ({ children, fallback, requireAuth = true, showModal = true }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState("login")
  const { user } = useAuth()

  if (!requireAuth || user) {
    return children
  }

  if (fallback) {
    return fallback
  }

  return (
    <>
      <div className="text-center py-8">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Authentication Required</h3>
            <p className="text-gray-600 mb-6">Please sign in to your account to continue with your purchase.</p>
          </div>

          <div className="space-y-3">
            <Button
              className="w-full"
              onClick={() => {
                setAuthMode("login")
                setIsAuthModalOpen(true)
              }}
            >
              Sign In
            </Button>
            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => {
                setAuthMode("signup")
                setIsAuthModalOpen(true)
              }}
            >
              Create Account
            </Button>
          </div>
        </div>
      </div>

      {showModal && (
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          mode={authMode}
          onModeChange={setAuthMode}
        />
      )}
    </>
  )
}

export default AuthGuard
