"use client";

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import HomeView, { Product } from "./components/HomeView";
import CompareView from "./components/CompareView";
import AIChatView from "./components/AIChatView";
import DashboardView from "./components/DashboardView";
import BlogView from "./components/BlogView";
import WishlistView from "./components/WishlistView";
import LoginView from "./components/LoginView";

export default function Home() {
  const [currentView, setCurrentView] = useState("home");
  const [shortlisted, setShortlisted] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [notifications, setNotifications] = useState<string[]>([
    "Price Alert: ASUS Vivobook 16 OLED dropped by ₹2,000!",
    "New Article: 2026 Laptop Buyer's Guide published.",
  ]);

  const [user, setUser] = useState<{ name: string; email: string } | null>({
    name: "Eswar",
    email: "eswar@example.com",
  });

  const toggleWishlist = (product: Product) => {
    if (wishlist.some((p) => p.id === product.id)) {
      setWishlist(wishlist.filter((p) => p.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
      setNotifications((prev) => [`Added ${product.name} to Wishlist`, ...prev]);
    }
  };

  const handleSetPriceAlert = (product: Product, targetPrice: number) => {
    setNotifications((prev) => [
      `Price tracker set for ${product.name} at ₹${targetPrice.toLocaleString()}`,
      ...prev,
    ]);
  };

  const handleCompareFromHome = (selectedItems: Product[]) => {
    setShortlisted(selectedItems);
    setCurrentView("compare");
  };

  const handleRemoveFromCompare = (id: string) => {
    setShortlisted(shortlisted.filter((p) => p.id !== id));
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView("login");
  };

  const handleLoginSuccess = (userObj: { name: string; email: string }) => {
    setUser(userObj);
    setCurrentView("home");
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#0F172A] flex flex-col font-sans relative selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation */}
      {currentView !== "login" && (
        <Navbar
          currentView={currentView}
          onNavigate={(v) => setCurrentView(v)}
          shortlistedCount={shortlisted.length}
          wishlistCount={wishlist.length}
          user={user}
          onLogout={handleLogout}
          notifications={notifications}
        />
      )}

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {currentView === "login" && <LoginView onLoginSuccess={handleLoginSuccess} />}

        {currentView === "home" && (
          <HomeView
            onCompare={handleCompareFromHome}
            shortlisted={shortlisted}
            setShortlisted={setShortlisted}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            onSetPriceAlert={handleSetPriceAlert}
          />
        )}

        {currentView === "compare" && (
          <CompareView
            products={shortlisted}
            onBack={() => setCurrentView("home")}
            onLaunchChat={() => setCurrentView("chat")}
            onRemove={handleRemoveFromCompare}
          />
        )}

        {currentView === "chat" && (
          <AIChatView shortlisted={shortlisted} onBack={() => setCurrentView("home")} />
        )}

        {currentView === "dashboard" && (
          <DashboardView user={user} notifications={notifications} onNavigate={(v) => setCurrentView(v)} />
        )}

        {currentView === "blog" && <BlogView />}

        {currentView === "wishlist" && (
          <WishlistView
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            onCompare={(prods: Product[]) => {
              setShortlisted(prods);
              setCurrentView("compare");
            }}
            onBack={() => setCurrentView("home")}
          />
        )}
      </main>
    </div>
  );
}
