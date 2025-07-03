import { Link } from "react-router-dom"
import { Card, CardContent } from "../components/ui/Card"
import Badge from "../components/ui/Badge"

const categories = [
  {
    id: 1,
    name: "Electronics",
    description: "Latest gadgets and electronic devices",
    image: "/placeholder.svg?height=300&width=400",
    productCount: 156,
    featured: true,
  },
  {
    id: 2,
    name: "Clothing",
    description: "Fashion and apparel for all occasions",
    image: "/placeholder.svg?height=300&width=400",
    productCount: 234,
    featured: true,
  },
  {
    id: 3,
    name: "Home & Garden",
    description: "Everything for your home and garden",
    image: "/placeholder.svg?height=300&width=400",
    productCount: 189,
    featured: false,
  },
  {
    id: 4,
    name: "Sports & Fitness",
    description: "Gear up for your active lifestyle",
    image: "/placeholder.svg?height=300&width=400",
    productCount: 98,
    featured: true,
  },
]

const CategoriesPage = () => {
  const featuredCategories = categories.filter((cat) => cat.featured)

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our wide range of product categories, each carefully curated to bring you the best selection and
            value.
          </p>
        </div>

        {/* Featured Categories */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCategories.map((category) => (
              <Link key={category.id} to={`/products?category=${category.name.toLowerCase()}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-3 right-3 bg-blue-600">Featured</Badge>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 mb-3">{category.description}</p>
                      <p className="text-sm text-blue-600 font-medium">{category.productCount} products</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* All Categories */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">All Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.id} to={`/products?category=${category.name.toLowerCase()}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                  <CardContent className="p-0 h-full flex flex-col">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {category.featured && (
                        <Badge className="absolute top-2 right-2 bg-blue-600 text-xs">Featured</Badge>
                      )}
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 flex-1">{category.description}</p>
                      <p className="text-sm text-blue-600 font-medium">{category.productCount} products</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default CategoriesPage
