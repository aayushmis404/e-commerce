"use client"

import { Link } from "react-router-dom"
import { Star, ShoppingCart } from "lucide-react"
import Button from "../ui/Button"
import { Card, CardContent, CardFooter } from "../ui/Card"
import Badge from "../ui/Badge"
import { useCart } from "../../contexts/CartContext"
import { useToast } from "../../contexts/ToastContext"
import { formatPrice } from "../../utils/helpers"

const ProductCard = ({ product }) => {
  const { addItem } = useCart()
  const { addToast } = useToast()

  const handleAddToCart = (e) => {
    e.preventDefault()
    addItem(product)
    addToast(`${product.name} has been added to your cart.`, "success")
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
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <Link to={`/product/${product.id}`}>
        <CardContent className="p-0">
          <div className="relative overflow-hidden rounded-t-lg">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {product.discount && <Badge className="absolute top-2 left-2 bg-red-500">-{product.discount}%</Badge>}
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
            <div className="flex items-center mb-3">
              <div className="flex items-center">{renderStars(product.rating)}</div>
              <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-blue-600">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={handleAddToCart}>
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ProductCard
