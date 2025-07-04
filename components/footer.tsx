import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter section */}
      <div className="bg-blue-600 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">Stay in the know</h3>
              <p className="text-blue-100">Get special offers and deals delivered to your inbox</p>
            </div>
            <div className="flex w-full md:w-auto">
              <Input type="email" placeholder="Enter your email" className="rounded-r-none text-black" />
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black rounded-l-none">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-yellow-400 text-blue-900 px-3 py-1 rounded font-bold text-xl">W</div>
              <span className="text-xl font-bold">Walmart</span>
            </div>
            <p className="text-gray-300 mb-4">Save Money. Live Better. Your one-stop shop for everything you need.</p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Track Your Order
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Product Recalls
                </a>
              </li>
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  All Departments
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Grocery
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Electronics
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Home & Garden
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Clothing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Health & Beauty
                </a>
              </li>
            </ul>
          </div>

          {/* Account & Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Account & Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Your Account
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Walmart+
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Credit Cards
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Gift Cards
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Registry
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Store Finder
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact info */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-blue-400" />
              <div>
                <p className="font-semibold">Store Locator</p>
                <p className="text-gray-300 text-sm">Find a store near you</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-blue-400" />
              <div>
                <p className="font-semibold">1-800-WALMART</p>
                <p className="text-gray-300 text-sm">Customer service</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-blue-400" />
              <div>
                <p className="font-semibold">help@walmart.com</p>
                <p className="text-gray-300 text-sm">Email support</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-300 text-sm mb-2 md:mb-0">© 2024 Walmart Inc. All Rights Reserved.</div>
            <div className="flex space-x-6 text-sm text-gray-300">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Accessibility
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
