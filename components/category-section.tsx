import { Card, CardContent } from "@/components/ui/card"

const categories = [
  { name: "Electronics", image: "/placeholder.svg?height=150&width=150", color: "bg-purple-100" },
  { name: "Clothing", image: "/placeholder.svg?height=150&width=150", color: "bg-pink-100" },
  { name: "Home & Garden", image: "/placeholder.svg?height=150&width=150", color: "bg-green-100" },
  { name: "Sports & Outdoors", image: "/placeholder.svg?height=150&width=150", color: "bg-blue-100" },
  { name: "Health & Beauty", image: "/placeholder.svg?height=150&width=150", color: "bg-yellow-100" },
  { name: "Grocery", image: "/placeholder.svg?height=150&width=150", color: "bg-red-100" },
  { name: "Auto & Tires", image: "/placeholder.svg?height=150&width=150", color: "bg-gray-100" },
  { name: "Baby", image: "/placeholder.svg?height=150&width=150", color: "bg-orange-100" },
]

export default function CategorySection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => (
            <Card key={category.name} className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-4 text-center">
                <div className={`${category.color} rounded-full p-4 mb-3 group-hover:scale-105 transition-transform`}>
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-16 h-16 mx-auto object-contain"
                  />
                </div>
                <h3 className="font-semibold text-sm text-gray-900">{category.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
