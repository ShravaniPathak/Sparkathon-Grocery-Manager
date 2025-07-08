"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Filter, Search, Package } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface OrdersPageProps {
  onBack: () => void
}

export default function OrdersPage({ onBack }: OrdersPageProps) {
  const [orders, setOrders] = useState<any[]>([])
  const [filteredOrders, setFilteredOrders] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterFrom, setFilterFrom] = useState("all")
  const [filterTo, setFilterTo] = useState("all")

  const walmarts = [
    { name: "Walmart Downtown", address: "123 Main St, Springfield" },
    { name: "Walmart Southside", address: "456 South St, Springfield" },
    { name: "Walmart Eastview", address: "789 East Rd, Springfield" },
    { name: "Walmart Westgate", address: "101 West Ave, Springfield" },
    { name: "Walmart Northpark", address: "202 North Dr, Springfield" },
    { name: "Walmart Midtown", address: "303 Central Blvd, Springfield" }
  ]

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]")
    setOrders(storedOrders)
  }, [])

  useEffect(() => {
    let filtered = orders
    if (searchTerm) {
      filtered = filtered.filter((order) =>
        order.item.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    if (filterFrom !== "all") {
      filtered = filtered.filter((order) => order.from === filterFrom)
    }
    if (filterTo !== "all") {
      filtered = filtered.filter((order) => order.to === filterTo)
    }
    setFilteredOrders(filtered)
  }, [orders, searchTerm, filterFrom, filterTo])

  const handleReceivedOrder = (order: any, index: number) => {
    const groceryItems = JSON.parse(localStorage.getItem("groceryItems") || "[]")
    const updatedItems = [...groceryItems]

    const fromItemIndex = updatedItems.findIndex(
      (item) => item.name === order.item && item.walmart === order.from
    )
    const toItemIndex = updatedItems.findIndex(
      (item) => item.name === order.item && item.walmart === order.to
    )

    if (fromItemIndex !== -1) {
      updatedItems[fromItemIndex].quantity -= order.quantity
    }
    if (toItemIndex !== -1) {
      updatedItems[toItemIndex].quantity += order.quantity
    } else {
      // create new item if it doesn't exist at the destination
      const referenceItem = updatedItems[fromItemIndex] || {}
      updatedItems.push({
        ...referenceItem,
        id: Date.now(),
        walmart: order.to,
        quantity: order.quantity,
      })
    }

    localStorage.setItem("groceryItems", JSON.stringify(updatedItems))

    const remainingOrders = orders.filter((_, i) => i !== index)
    setOrders(remainingOrders)
    localStorage.setItem("orders", JSON.stringify(remainingOrders))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Placed Orders</h1>
          <p className="text-gray-600">View and manage your order history</p>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by item name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>From Walmart</Label>
              <Select value={filterFrom} onValueChange={setFilterFrom}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {walmarts.map(({ address }) => (
                    <SelectItem key={address} value={address}>{address}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>To Walmart</Label>
              <Select value={filterTo} onValueChange={setFilterTo}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {walmarts.map(({ address }) => (
                    <SelectItem key={address} value={address}>{address}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setFilterFrom("all")
                  setFilterTo("all")
                }}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Grid */}
      {filteredOrders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map((order, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{order.item}</CardTitle>
                <CardDescription>
                  Quantity: {order.quantity}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">From:</span>
                  <span>{order.from}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">To:</span>
                  <span>{order.to}</span>
                </div>
                <Badge className="mt-2">Order Placed</Badge>
                <div className="pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-green-50 hover:bg-green-100 text-green-700"
                    onClick={() => handleReceivedOrder(order, idx)}
                  >
                    Mark as Received
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600">You haven’t placed any orders yet or none match the current filters.</p>
            <Button onClick={onBack} className="mt-4 bg-green-600 hover:bg-green-700">
              Go Back
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

