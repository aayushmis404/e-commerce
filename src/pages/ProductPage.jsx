"use client"

import { useParams } from "react-router-dom"
import ProductDetail from "../components/product/ProductDetail"
import { products } from "../data/products"

const ProductPage = () => {
  const { id } = useParams()
  const product = products.find((p) => p.id === Number.parseInt(id))

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <ProductDetail product={product} />
    </div>
  )
}

export default ProductPage
