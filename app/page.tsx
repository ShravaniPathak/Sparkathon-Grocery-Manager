"use client"

import { useState, useEffect } from "react"
import LoginPage from "@/components/auth/login-page"
import RegisterPage from "@/components/auth/register-page"
import Dashboard from "@/components/dashboard/dashboard"
import ItemRegistration from "@/components/items/item-registration"
import ItemManagement from "@/components/items/item-management"
import OrderManagement from "@/components/orders/order-management"
import ProfilePage from "@/components/profile/profile-page"
import Navigation from "@/components/layout/navigation"

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState("login")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const user = localStorage.getItem("currentUser")
    if (user) {
      setCurrentUser(JSON.parse(user))
      setIsAuthenticated(true)
      setCurrentPage("dashboard")
    }
  }, [])

  const handleLogin = (userData: any) => {
    setCurrentUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem("currentUser", JSON.stringify(userData))
    setCurrentPage("dashboard")
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("currentUser")
    localStorage.removeItem("groceryItems")
    setCurrentPage("login")
  }

  const renderPage = () => {
    if (!isAuthenticated) {
      switch (currentPage) {
        case "register":
          return <RegisterPage onSwitchToLogin={() => setCurrentPage("login")} />
        default:
          return <LoginPage onLogin={handleLogin} onSwitchToRegister={() => setCurrentPage("register")} />
      }
    }

    switch (currentPage) {
      case "add-item":
        return <ItemRegistration onBack={() => setCurrentPage("dashboard")} />
      case "manage-items":
        return <ItemManagement onBack={() => setCurrentPage("dashboard")} />
      case "profile":
        return <ProfilePage user={currentUser} onBack={() => setCurrentPage("dashboard")} />
      case "manage-orders":
        return <OrderManagement onBack={() => setCurrentPage("dashboard")} />
      default:
        return <Dashboard onNavigate={setCurrentPage} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {isAuthenticated && (
        <Navigation currentPage={currentPage} onNavigate={setCurrentPage} onLogout={handleLogout} user={currentUser} />
      )}
      <main className={isAuthenticated ? "pt-16" : ""}>{renderPage()}</main>
    </div>
  )
}
