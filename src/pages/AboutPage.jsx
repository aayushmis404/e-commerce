import { Users, Award, Truck, Shield, Heart, Globe } from "lucide-react"
import { Card, CardContent } from "../components/ui/Card"; // ✅ Correct

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About NexCart</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            We're passionate about bringing you the best products at unbeatable prices, with exceptional customer
            service that makes shopping a joy.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2020, NexCart began as a small startup with a big dream: to create an online shopping
                  experience that puts customers first. What started in a garage has grown into a trusted platform
                  serving thousands of happy customers worldwide.
                </p>
                <p>
                  We believe that great products shouldn't come with great hassles. That's why we've built our entire
                  business around three core principles: quality products, competitive prices, and exceptional customer
                  service.
                </p>
                <p>
                  Today, we're proud to offer a carefully curated selection of products across multiple categories, all
                  backed by our commitment to your satisfaction.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Our team at work"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do and shape the experience we create for our customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold">Customer First</h3>
                <p className="text-gray-600">
                  Every decision we make is guided by what's best for our customers. Your satisfaction is our success.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Award className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold">Quality Excellence</h3>
                <p className="text-gray-600">
                  We carefully vet every product to ensure it meets our high standards for quality and value.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold">Trust & Security</h3>
                <p className="text-gray-600">
                  Your privacy and security are paramount. We use industry-leading practices to protect your data.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                  <Truck className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold">Fast Delivery</h3>
                <p className="text-gray-600">
                  We know you're excited about your purchase. That's why we prioritize fast, reliable shipping.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                  <Users className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold">Community</h3>
                <p className="text-gray-600">
                  We're more than a store - we're a community of people who love great products and great experiences.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto">
                  <Globe className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold">Sustainability</h3>
                <p className="text-gray-600">
                  We're committed to sustainable practices and supporting brands that care about our planet.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-blue-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-blue-100">Products Sold</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.5%</div>
              <div className="text-blue-100">Customer Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Customer Support</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
