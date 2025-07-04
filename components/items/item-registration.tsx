"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Plus } from "lucide-react"

interface ItemRegistrationProps {
  onBack: () => void
}

export default function ItemRegistration({ onBack }: ItemRegistrationProps) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    unit: "",
    purchaseDate: "",
    expiryDate: "",
    location: "",
    notes: "",
    discount1 : "",
    discount2 : "",
    purchasing_price: "",
    selling_price: "",
  })
  const [success, setSuccess] = useState("")

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

  const units = ["pieces", "kg", "g", "lbs", "oz", "liters", "ml", "cups", "cans", "bottles", "packages", "dozen"]

  const locations = ["Refrigerator", "Freezer", "Pantry", "Counter", "Cupboard", "Other"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newItem = {
      id: Date.now(),
      ...formData,
      quantity: Number.parseFloat(formData.quantity),
      createdAt: new Date().toISOString(),
    }

    const existingItems = JSON.parse(localStorage.getItem("groceryItems") || "[]")
    existingItems.push(newItem)
    localStorage.setItem("groceryItems", JSON.stringify(existingItems))

    setSuccess("Item added successfully!")

    // Reset form
    setFormData({
    name: "",
    category: "",
    quantity: "",
    unit: "",
    purchaseDate: "",
    expiryDate: "",
    location: "",
    notes: "",
    discount1 : "",
    discount2 : "",
    purchasing_price: "",
    selling_price: "",
    })

    setTimeout(() => setSuccess(""), 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add New Item</h1>
            <p className="text-gray-600">Register a new grocery item with expiry tracking</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              Item Details
            </CardTitle>
            <CardDescription>Fill in the information about your grocery item</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Item Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g., Organic Bananas"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select onValueChange={(value) => handleSelectChange("category", value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity *</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 1.5"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit *</Label>
                  <Select onValueChange={(value) => handleSelectChange("unit", value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="purchaseDate">Purchase Date</Label>
                  <Input
                    id="purchaseDate"
                    name="purchaseDate"
                    type="date"
                    value={formData.purchaseDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date *</Label>
                  <Input
                    id="expiryDate"
                    name="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="purchasing_price">Purchasing Price</Label>
                  <Input
                    id="purchasing_price"
                    name="purchasing_price"
                    type="number"
                    placeholder="e.g., 20"
                    value={formData.purchasing_price}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="selling_price">Selling Price *</Label>
                  <Input
                    id="selling_price"
                    name="selling_price"
                    type="number"
                    placeholder="e.g., 50"
                    value={formData.selling_price}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="discount1">Discount 1 day from Expiry *</Label>
                  <Input
                    id="discount1"
                    name="discount1"
                    type="number"
                    placeholder="e.g., 5%"
                    value={formData.discount1}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discount2">Discount 2 days from Expiry *</Label>
                  <Input
                    id="discount2"
                    name="discount2"
                    type="number"
                    placeholder="e.g., 2%"
                    value={formData.discount2}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Storage Location</Label>
                <Select onValueChange={(value) => handleSelectChange("location", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select storage location" />
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
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  placeholder="Additional notes about the item..."
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                />
              </div>

              {success && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800">{success}</p>
                </div>
              )}

              <div className="flex gap-4">
                <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
                <Button type="button" variant="outline" onClick={onBack}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
