import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

const deals = [
  {
    title: "Flash Deal",
    discount: "50% OFF",
    originalPrice: "$199.99",
    salePrice: "$99.99",
    image: "/placeholder.svg?height=200&width=200",
    timeLeft: "2h 15m",
  },
  {
    title: "Daily Special",
    discount: "30% OFF",
    originalPrice: "$79.99",
    salePrice: "$55.99",
    image: "/placeholder.svg?height=200&width=200",
    timeLeft: "5h 42m",
  },
  {
    title: "Weekend Deal",
    discount: "40% OFF",
    originalPrice: "$149.99",
    salePrice: "$89.99",
    image: "/placeholder.svg?height=200&width=200",
    timeLeft: "1d 8h",
  },
]

export default function DealsSection() {
  return (
    <section className="py-12 bg-red-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Flash Deals</h2>
          <Badge variant="destructive" className="text-lg px-4 py-2">
            <Clock className="w-4 h-4 mr-2" />
            Limited Time
          </Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deals.map((deal, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow cursor-pointer border-2 border-red-200">
              <CardContent className="p-6">
                <div className="relative mb-4">
                  <img
                    src={deal.image || "/placeholder.svg"}
                    alt={deal.title}
                    className="w-full h-48 object-contain rounded-lg"
                  />
                  <Badge className="absolute top-2 left-2 bg-red-600 text-white">{deal.discount}</Badge>
                </div>
                <h3 className="font-bold text-lg mb-2">{deal.title}</h3>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl font-bold text-red-600">{deal.salePrice}</span>
                  <span className="text-lg text-gray-500 line-through">{deal.originalPrice}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>Ends in {deal.timeLeft}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
