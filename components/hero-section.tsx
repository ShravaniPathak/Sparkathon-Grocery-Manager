import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold">Save big on everything you need</h1>
            <p className="text-xl text-blue-100">
              From groceries to electronics, find it all at unbeatable prices with free shipping on orders $35+
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                Shop Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                Join Walmart+
              </Button>
            </div>
          </div>
          <div className="relative">
            <img
              src="/placeholder.svg?height=400&width=600"
              alt="Hero product showcase"
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
      >
        <ChevronRight className="h-8 w-8" />
      </Button>
    </section>
  )
}
