"use client"

import { Link } from "react-router-dom"
import { Star, ShoppingCart } from "lucide-react"
import Button from "../ui/Button"
import { Card, CardContent } from "../ui/Card"
import Badge from "../ui/Badge"
import { useCart } from "../../contexts/CartContext"
import { useToast } from "../../contexts/ToastContext"
import { formatPrice } from "../../utils/helpers"

const ProductListView = ({ products }) => {
  const { addItem } = useCart()
  const { addToast } = useToast()

  const handleAddToCart = (e, product) => {
    e.preventDefault()
    addItem(product)
    addToast(`${product.name} added to cart!`, "success")
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <Card key={product.id} className="hover:shadow-lg transition-shadow duration-300">
          <Link to={`/product/${product.id}`}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Product Image */}
                <div className="flex-shrink-0">
                  <div className="relative w-full md:w-48 h-48 overflow-hidden rounded-lg">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    {product.discount && (
                      <Badge className="absolute top-2 left-2 bg-red-500">-{product.discount}%</Badge>
                    )}
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col h-full">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>

                      <div className="flex items-center mb-3">
                        <div className="flex items-center">{renderStars(product.rating)}</div>
                        <span className="ml-2 text-sm text-gray-600">
                          {product.rating} ({product.reviews} reviews)
                        </span>
                      </div>

                      <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-blue-600">{formatPrice(product.price)}</span>
                          {product.originalPrice && (
                            <span className="text-lg text-gray-500 line-through">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>

                        <Button onClick={(e) => handleAddToCart(e, product)} className="flex items-center gap-2">
                          <ShoppingCart className="w-4 h-4" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  )
}

export default ProductListView
