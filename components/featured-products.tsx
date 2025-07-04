import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Heart, ShoppingCart } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: "$79.99",
    originalPrice: "$99.99",
    rating: 4.5,
    reviews: 1234,
    image: "/placeholder.svg?height=250&width=250",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Smart Watch Series 8",
    price: "$299.99",
    originalPrice: "$399.99",
    rating: 4.8,
    reviews: 856,
    image: "/placeholder.svg?height=250&width=250",
    badge: "New",
  },
  {
    id: 3,
    name: "Portable Bluetooth Speaker",
    price: "$49.99",
    originalPrice: "$69.99",
    rating: 4.3,
    reviews: 567,
    image: "/placeholder.svg?height=250&width=250",
    badge: "Sale",
  },
  {
    id: 4,
    name: "Wireless Charging Pad",
    price: "$24.99",
    originalPrice: "$34.99",
    rating: 4.2,
    reviews: 432,
    image: "/placeholder.svg?height=250&width=250",
    badge: "Popular",
  },
  {
    id: 5,
    name: "USB-C Hub Adapter",
    price: "$39.99",
    originalPrice: "$59.99",
    rating: 4.6,
    reviews: 789,
    image: "/placeholder.svg?height=250&width=250",
    badge: "Top Rated",
  },
  {
    id: 6,
    name: "Laptop Stand Adjustable",
    price: "$34.99",
    originalPrice: "$49.99",
    rating: 4.4,
    reviews: 345,
    image: "/placeholder.svg?height=250&width=250",
    badge: "Deal",
  },
]

export default function FeaturedProducts() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-contain rounded-lg group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">{product.badge}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                <h3 className="font-semibold text-sm mb-2 line-clamp-2 text-gray-900">{product.name}</h3>

                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-lg font-bold text-gray-900">{product.price}</span>
                    <span className="text-sm text-gray-500 line-through ml-2">{product.originalPrice}</span>
                  </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
