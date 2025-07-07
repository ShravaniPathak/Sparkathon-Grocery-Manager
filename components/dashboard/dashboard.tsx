"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Package, AlertTriangle, Calendar, TrendingUp } from "lucide-react"

interface DashboardProps {
  onNavigate: (page: string) => void
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const [items, setItems] = useState<any[]>([])
  const [stats, setStats] = useState({
    total: 0,
    expiringSoon: 0,
    expired: 0,
    fresh: 0,
    outOfStock: 0,
  })

  useEffect(() => {
    const groceryItems = JSON.parse(localStorage.getItem("groceryItems") || "[]")
    setItems(groceryItems)

    const now = new Date()
    const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000)

    const expiringSoon = groceryItems.filter((item: any) => {
      const expiryDate = new Date(item.expiryDate)
      return expiryDate > now && expiryDate <= threeDaysFromNow
    }).length

    const expired = groceryItems.filter((item: any) => {
      const expiryDate = new Date(item.expiryDate)
      return expiryDate <= now
    }).length

    const fresh = groceryItems.filter((item: any) => {
      const expiryDate = new Date(item.expiryDate)
      return expiryDate > threeDaysFromNow
    }).length

    const outOfStock = groceryItems.filter(
        (item: any) => item.quantity === 0).length

    setStats({
      total: groceryItems.length,
      expiringSoon,
      expired,
      fresh,
      outOfStock,
    })
  }, [])

  const getExpiryStatus = (expiryDate: string) => {
    const now = new Date()
    const expiry = new Date(expiryDate)
    const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000)

    if (expiry <= now) return "expired"
    if (expiry <= threeDaysFromNow) return "expiring"
    return "fresh"
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "expired":
        return <Badge variant="destructive">Expired</Badge>
      case "expiring":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Expiring Soon
          </Badge>
        )
      default:
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Fresh
          </Badge>
        )
    }
  }

  const recentItems = items.slice(-5).reverse()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's an overview of your grocery items.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Items in your inventory</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fresh Items</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.fresh}</div>
            <p className="text-xs text-muted-foreground">Items in good condition</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <Calendar className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.expiringSoon}</div>
            <p className="text-xs text-muted-foreground">Items expiring in 3 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expired Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.expired}</div>
            <p className="text-xs text-muted-foreground">Items past expiry date</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your grocery items efficiently</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={() => onNavigate("add-item")} className="w-full bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Add New Item
            </Button>
            <Button onClick={() => onNavigate("manage-items")} variant="outline" className="w-full">
              <Package className="h-4 w-4 mr-2" />
              Manage All Items
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Items</CardTitle>
            <CardDescription>Your latest grocery additions</CardDescription>
          </CardHeader>
          <CardContent>
            {recentItems.length > 0 ? (
              <div className="space-y-3">
                {recentItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">Expires: {new Date(item.expiryDate).toLocaleDateString()}</p>
                    </div>
                    {getStatusBadge(getExpiryStatus(item.expiryDate))}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No items added yet</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Expiry alert */}
      {(stats.expired > 0 || stats.expiringSoon > 0) && (
        <Card className="border-yellow-200 bg-yellow-50 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-yellow-800">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Attention Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {stats.expired > 0 && (
                <p className="text-red-700">
                  You have {stats.expired} expired item{stats.expired > 1 ? "s" : ""} that need attention.
                </p>
              )}
              {stats.expiringSoon > 0 && (
                <p className="text-yellow-700">
                  {stats.expiringSoon} item{stats.expiringSoon > 1 ? "s" : ""} will expire within 3 days.
                </p>
              )}
            </div>
            <Button onClick={() => onNavigate("manage-items")} className="mt-4 bg-yellow-600 hover:bg-yellow-700">
              Review Items
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Stock alert */}
      {(stats.outOfStock > 0) && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center text-yellow-800">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Attention Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {stats.outOfStock > 0 && (
                <p className="text-yellow-700">
                  You have {stats.outOfStock} item{stats.outOfStock > 1 ? "s" : ""} out of stock.
                </p>
              )}
            </div>
            <Button onClick={() => onNavigate("manage-items")} className="mt-4 bg-yellow-600 hover:bg-yellow-700">
              Review Items
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
