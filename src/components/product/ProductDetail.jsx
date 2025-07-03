"use client"

import { useState } from "react"
import { Star, ShoppingCart, Heart, Share2, Minus, Plus } from "lucide-react"
import Button from "../ui/Button"
import Badge from "../ui/Badge"
import { useCart } from "../../contexts/CartContext"
import { useToast } from "../../contexts/ToastContext"
import { formatPrice } from "../../utils/helpers"

const ProductDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const { addItem } = useCart()
  const { addToast } = useToast()

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product)
    }
    addToast(`${quantity} ${product.name}(s) added to your cart.`, "success")
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))
  }

  const images = [product.image, product.image, product.image, product.image]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img
              src={images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square overflow-hidden rounded-lg bg-gray-100 border-2 ${
                  selectedImage === index ? "border-blue-500" : "border-transparent"
                }`}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">{renderStars(product.rating)}</div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-blue-600">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <>
                <span className="text-xl text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                <Badge className="bg-red-500">Save {formatPrice(product.originalPrice - product.price)}</Badge>
              </>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          <hr />

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="p-2"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <Button variant="ghost" onClick={() => setQuantity(quantity + 1)} className="p-2">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg" className="p-3 bg-transparent">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="p-3 bg-transparent">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <hr />

          {/* Product Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Product Details</h3>
            <div className="prose max-w-none">
              <p>{product.description}</p>
              <p>
                This high-quality product is designed to meet your needs with exceptional performance and durability.
                Crafted with attention to detail and using premium materials.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
