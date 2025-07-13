import { Link } from "react-router-dom"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import Button from "../ui/Button"
import Input from "../ui/Input"

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">ES</span>
              </div>
              <span className="text-xl font-bold">EasyShop</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your ultimate shopping destination for quality products at great prices. We're committed to providing
              exceptional customer service and fast, reliable shipping.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800 p-2">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800 p-2">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800 p-2">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800 p-2">
                <Youtube className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/help" className="text-gray-300 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-300 hover:text-white transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-300 hover:text-white transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Connected</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="w-4 h-4" />
                <span>support@NexCart.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="w-4 h-4" />
                <span>021-******</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin className="w-4 h-4" />
                <span>Biratnagar</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-300">Subscribe to our newsletter</p>
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-700" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-300">© 2024 EasyShop. All rights reserved.</div>
          <div className="flex space-x-6 text-sm text-gray-300">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
