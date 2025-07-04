"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, Edit, Trash2, Package, Filter } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface ItemManagementProps {
  onBack: () => void
}

export default function ItemManagement({ onBack }: ItemManagementProps) {
  const [items, setItems] = useState<any[]>([])
  const [filteredItems, setFilteredItems] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [editingItem, setEditingItem] = useState<any>(null)

  const categories = [
    "Fruits & Vegetables",
    "Dairy & Eggs",
    "Meat & Seafood",
    "Pantry Items",
    "Frozen Foods",
    "Beverages",
    "Snacks",
    "Condiments & Sauces",
    "Bakery",
    "Other",
  ]

  const units = ["pieces", "kg", "g", "lbs", "oz", "liters", "ml", "cups", "cans", "bottles", "packages"]
  const locations = ["Refrigerator", "Freezer", "Pantry", "Counter", "Cupboard", "Other"]

  //Formula for calculating remark and discounted price for the item
  const applyDiscount=(dis: string, sell: string, purchase: string): {
    remark: string,
    discounted_price: string,
  } =>
  {
    let d=Number(dis);
    let selling_price=Number(sell);
    let purchasing_price=Number(purchase);
    let n=d/100*selling_price;
    let r=selling_price-n;
    let res={
      remark:"No discount applied",
      discounted_price:sell
    };

    if (r>=purchasing_price)
    {
      res.remark="Discount applied";
      res.discounted_price=r.toString();
    }
    else
    {
      res.remark="Discounted price less than original price";
      res.discounted_price=r.toString();
    }
    return res;
  }

  useEffect(() => {
    loadItems()
  }, [])

  useEffect(() => {
    filterItems()
  }, [items, searchTerm, filterCategory, filterStatus])

  const loadItems = () => {
    const groceryItems = JSON.parse(localStorage.getItem("groceryItems") || "[]")
    setItems(groceryItems)
  }

  const filterItems = () => {
    let filtered = items

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (filterCategory !== "all") {
      filtered = filtered.filter((item) => item.category === filterCategory)
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((item) => getExpiryStatus(item.expiryDate) === filterStatus)
    }

    setFilteredItems(filtered)
  }

  const getExpiryStatus = (expiryDate: string) => {
    const now = new Date()
    const expiry = new Date(expiryDate)
    const twoDaysFromNow = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000)

    if (expiry <= now) return "expired"
    if (expiry <= twoDaysFromNow) return "expiring"
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

//Applying discount based on proximity to expiry
    const getDiscountAndRemark = (expiryDate: string, selling_price: string, discount1: string, discount2: string, purchasing_price: string): {
      remark: string,
      discounted_price: string,
    } => {

        const now = new Date()
        const expiry = new Date(expiryDate)
        const diffTime = expiry.getTime() - now.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      let res={      
        remark: "No discount applied",
        discounted_price: selling_price,
      };

      if (diffDays === 1) {
        res=applyDiscount(discount1, selling_price, purchasing_price)
      }
      if (diffDays === 2) {
        res=applyDiscount(discount2, selling_price, purchasing_price)
    }
    return res;
    }

  const getDaysUntilExpiry = (expiryDate: string) => {
    const now = new Date()
    const expiry = new Date(expiryDate)
    const diffTime = expiry.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))


    if (diffDays < 0) return `Expired ${Math.abs(diffDays)} days ago`
    if (diffDays === 0) return "Expires today"
    if (diffDays === 1) return "Expires tomorrow"    
    if (diffDays === 2) return "Expires day after tomorrow"

    return `Expires in ${diffDays} days`
  }

  const deleteItem = (id: number) => {
    const updatedItems = items.filter((item) => item.id !== id)
    setItems(updatedItems)
    localStorage.setItem("groceryItems", JSON.stringify(updatedItems))
  }

  const updateItem = (updatedItem: any) => {
    const updatedItems = items.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    setItems(updatedItems)
    localStorage.setItem("groceryItems", JSON.stringify(updatedItems))
    setEditingItem(null)
  }

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateItem(editingItem)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Items</h1>
          <p className="text-gray-600">View, edit, and organize your grocery items</p>
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
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="fresh">Fresh</SelectItem>
                  <SelectItem value="expiring">Expiring Soon</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setFilterCategory("all")
                  setFilterStatus("all")
                }}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Items Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <CardDescription>{item.category}</CardDescription>
                  </div>
                  {getStatusBadge(getExpiryStatus(item.expiryDate))}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quantity:</span>
                    <span>
                      {item.quantity} {item.unit}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span>{item.location || "Not specified"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expiry:</span>
                    <span>{new Date(item.expiryDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discounted Price :</span>
                    <span>
                        {getDiscountAndRemark(item.expiryDate, item.selling_price, item.discount1, item.discount2, item.purchasing_price).discounted_price}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discounted Price:</span>
                  <span
                    className={`font-medium ${
                      getDiscountAndRemark(item.expiryDate, item.selling_price, item.discount1, item.discount2, item.purchasing_price).remark === "Discounted price less than original price"
                        ? "text-red-600"
                        : getDiscountAndRemark(item.expiryDate, item.selling_price, item.discount1, item.discount2, item.purchasing_price).remark === "Discount applied"
                          ? "text-yellow-600"
                          : "text-green-600"
                    }`}
                  >
                    {getDiscountAndRemark(item.expiryDate, item.selling_price, item.discount1, item.discount2, item.purchasing_price).remark}
                  </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span
                      className={`font-medium ${
                        getExpiryStatus(item.expiryDate) === "expired"
                          ? "text-red-600"
                          : getExpiryStatus(item.expiryDate) === "expiring"
                            ? "text-yellow-600"
                            : "text-green-600"
                      }`}
                    >
                      {getDaysUntilExpiry(item.expiryDate)}
                    </span>
                  </div>

                  {item.notes && (
                    <div className="pt-2 border-t">
                      <span className="text-gray-600 text-xs">Notes:</span>
                      <p className="text-xs mt-1">{item.notes}</p>
                    </div>
                  )}
                </div>
                <div className="flex gap-2 mt-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => setEditingItem({ ...item })}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Edit Item</DialogTitle>
                        <DialogDescription>Update the item details</DialogDescription>
                      </DialogHeader>
                      {editingItem && (
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                          <div className="space-y-2">
                            <Label>Item Name</Label>
                            <Input
                              value={editingItem.name}
                              onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Category</Label>
                            <Select
                              value={editingItem.category}
                              onValueChange={(value) => setEditingItem({ ...editingItem, category: value })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem key={category} value={category}>
                                    {category}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-2">
                              <Label>Quantity</Label>
                              <Input
                                type="number"
                                step="0.1"
                                value={editingItem.quantity}
                                onChange={(e) =>
                                  setEditingItem({ ...editingItem, quantity: Number.parseFloat(e.target.value) })
                                }
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Unit</Label>
                              <Select
                                value={editingItem.unit}
                                onValueChange={(value) => setEditingItem({ ...editingItem, unit: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {units.map((unit) => (
                                    <SelectItem key={unit} value={unit}>
                                      {unit}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>



                            <div className="space-y-2">
                              <Label>Discount 1 day from Expiry</Label>
                              <Input
                                type="number"
                                step="0.1"
                                value={editingItem.discount1}
                                onChange={(e) =>
                                  setEditingItem({ ...editingItem, discount1: Number.parseFloat(e.target.value) })
                                }
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Discount 2 day from Expiry</Label>
                              <Input
                                type="number"
                                step="0.1"
                                value={editingItem.discount2}
                                onChange={(e) =>
                                  setEditingItem({ ...editingItem, discount2: Number.parseFloat(e.target.value) })
                                }
                                required
                              />
                            </div>



                          </div>
                          <div className="space-y-2">
                            <Label>Expiry Date</Label>
                            <Input
                              type="date"
                              value={editingItem.expiryDate}
                              onChange={(e) => setEditingItem({ ...editingItem, expiryDate: e.target.value })}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Location</Label>
                            <Select
                              value={editingItem.location}
                              onValueChange={(value) => setEditingItem({ ...editingItem, location: value })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {locations.map((location) => (
                                  <SelectItem key={location} value={location}>
                                    {location}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Notes</Label>
                            <Textarea
                              value={editingItem.notes}
                              onChange={(e) => setEditingItem({ ...editingItem, notes: e.target.value })}
                              rows={2}
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                              Update Item
                            </Button>
                          </div>
                        </form>
                      )}
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteItem(item.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600 mb-4">
              {items.length === 0 ? "You haven't added any grocery items yet." : "No items match your current filters."}
            </p>
            {items.length === 0 && (
              <Button onClick={onBack} className="bg-green-600 hover:bg-green-700">
                Add Your First Item
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
