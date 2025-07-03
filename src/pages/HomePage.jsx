import Hero from "../components/layout/Hero"
import ProductGrid from "../components/product/ProductGrid"
import { products } from "../data/products"

const HomePage = () => {
  // Show only first 8 products as featured
  const featuredProducts = products.slice(0, 8)

  return (
    <div className="min-h-screen">
      <Hero />
      <section className="py-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
          <ProductGrid products={featuredProducts} />
        </div>
      </section>
    </div>
  )
}

export default HomePage
