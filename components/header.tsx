import { Search, ShoppingCart, MapPin, User, Menu, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Header() {
  return (
    <header className="bg-blue-600 text-white">
      {/* Top bar */}
      <div className="bg-blue-700 py-1">
        <div className="container mx-auto px-4 flex justify-between items-center text-xs">
          <div className="flex items-center space-x-4">
            <span>Free shipping, arrives in 3+ days</span>
            <span>|</span>
            <span>Free pickup today</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>English</span>
            <span>|</span>
            <span>USD</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and menu */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-white hover:bg-blue-500 lg:hidden">
              <Menu className="h-6 w-6" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="bg-yellow-400 text-blue-900 px-3 py-1 rounded font-bold text-xl">W</div>
              <span className="text-xl font-bold hidden sm:block">Walmart</span>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search everything at Walmart online and in store"
                className="w-full pl-4 pr-12 py-2 rounded-full border-0 text-black"
              />
              <Button
                size="icon"
                className="absolute right-0 top-0 h-full bg-yellow-400 hover:bg-yellow-500 text-black rounded-r-full"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-white hover:bg-blue-500 hidden lg:flex items-center space-x-1">
              <MapPin className="h-5 w-5" />
              <div className="text-left">
                <div className="text-xs">How do you want your items?</div>
                <div className="text-sm font-semibold">Sacramento, 95829</div>
              </div>
            </Button>

            <Button variant="ghost" size="icon" className="text-white hover:bg-blue-500">
              <Heart className="h-6 w-6" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-blue-500">
                  <User className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>Sign In</DropdownMenuItem>
                <DropdownMenuItem>Create Account</DropdownMenuItem>
                <DropdownMenuItem>Purchase History</DropdownMenuItem>
                <DropdownMenuItem>Walmart+</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" className="text-white hover:bg-blue-500 flex items-center space-x-1">
              <ShoppingCart className="h-6 w-6" />
              <span className="bg-yellow-400 text-black text-xs rounded-full px-2 py-1 font-bold">0</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation menu */}
      <nav className="bg-blue-500 py-2 hidden lg:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white hover:bg-blue-400 flex items-center space-x-1">
                  <Menu className="h-4 w-4" />
                  <span>All Departments</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem>Electronics</DropdownMenuItem>
                <DropdownMenuItem>Clothing</DropdownMenuItem>
                <DropdownMenuItem>Home & Garden</DropdownMenuItem>
                <DropdownMenuItem>Sports & Outdoors</DropdownMenuItem>
                <DropdownMenuItem>Health & Beauty</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" className="text-white hover:bg-blue-400">
              Services
            </Button>
            <Button variant="ghost" className="text-white hover:bg-blue-400">
              Grocery & Essentials
            </Button>
            <Button variant="ghost" className="text-white hover:bg-blue-400">
              Electronics
            </Button>
            <Button variant="ghost" className="text-white hover:bg-blue-400">
              Home
            </Button>
            <Button variant="ghost" className="text-white hover:bg-blue-400">
              Fashion
            </Button>
            <Button variant="ghost" className="text-white hover:bg-blue-400">
              Auto
            </Button>
          </div>
        </div>
      </nav>
    </header>
  )
}
