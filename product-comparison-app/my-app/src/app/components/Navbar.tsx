"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Scale,
  MessageSquare,
  LayoutDashboard,
  BookOpen,
  Menu,
  X,
  LogOut,
  User,
  Heart,
  Bell,
  ChevronDown,
} from "lucide-react";

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  shortlistedCount: number;
  wishlistCount: number;
  user: { name: string; email: string } | null;
  onLogout: () => void;
  notifications: string[];
}

export default function Navbar({
  currentView,
  onNavigate,
  shortlistedCount,
  wishlistCount,
  user,
  onLogout,
  notifications,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const navItems = [
    { id: "home", label: "Discover", icon: Sparkles },
    { id: "compare", label: "Compare", icon: Scale, badge: shortlistedCount },
    { id: "chat", label: "Ask AI", icon: MessageSquare },
    { id: "wishlist", label: "Wishlist", icon: Heart, badge: wishlistCount, badgeColor: "bg-rose-500" },
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "blog", label: "Magazine", icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate("home")}
          className="flex items-center gap-3 text-left focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#7C3AED] flex items-center justify-center text-white shadow-md shadow-[#2563EB]/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="font-black text-xl text-[#0F172A] tracking-tight leading-none flex items-center gap-1">
              Versus<span className="text-[#2563EB]">AI</span>
            </div>
            <div className="text-[10px] font-bold text-[#64748B] tracking-wider uppercase mt-0.5">
              RAG Spec Engine
            </div>
          </div>
        </motion.button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#EEF2F7] p-1.5 rounded-2xl border border-[#E2E8F0]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${isActive
                    ? "bg-[#FFFFFF] text-[#2563EB] shadow-sm border border-[#E2E8F0]"
                    : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#FFFFFF]/60"
                  }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#2563EB]" : "text-[#64748B]"}`} />
                {item.label}
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-black text-white ${item.badgeColor || "bg-[#2563EB]"
                      }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User & Notifications Action Group */}
        <div className="flex items-center gap-3">
          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2.5 rounded-xl bg-[#EEF2F7] hover:bg-[#E2E8F0] border border-[#E2E8F0] text-[#0F172A] relative transition-colors"
            >
              <Bell className="w-4.5 h-4.5 text-[#64748B]" />
              {notifications.length > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-[#2563EB] rounded-full ring-2 ring-white" />
              )}
            </button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-3 w-80 bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl shadow-xl p-4 z-50"
                >
                  <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3 mb-3">
                    <span className="font-black text-xs text-[#0F172A] uppercase tracking-wider">
                      Notifications ({notifications.length})
                    </span>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-[#94A3B8] hover:text-[#0F172A]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-[#64748B] text-center py-4 font-bold">
                        No new notifications
                      </p>
                    ) : (
                      notifications.map((note, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-xl bg-[#EEF2F7] border border-[#E2E8F0] text-xs font-bold text-[#0F172A]"
                        >
                          {note}
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Profile Menu */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-2.5 p-1.5 pr-3 rounded-2xl bg-[#EEF2F7] hover:bg-[#E2E8F0] border border-[#E2E8F0] transition-colors"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#0891B2] text-white flex items-center justify-center font-black text-xs">
                  {user.name[0]}
                </div>
                <span className="text-xs font-black text-[#0F172A] hidden sm:inline">{user.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#64748B]" />
              </button>

              {/* User Dropdown */}
              <AnimatePresence>
                {showUserDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-3 w-56 bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl shadow-xl p-2 z-50"
                  >
                    <div className="px-3 py-2 border-b border-[#E2E8F0] mb-1">
                      <div className="text-xs font-black text-[#0F172A]">{user.name}</div>
                      <div className="text-[10px] text-[#64748B] font-bold truncate">{user.email}</div>
                    </div>
                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        onNavigate("dashboard");
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-bold text-[#0F172A] hover:bg-[#EEF2F7] rounded-xl flex items-center gap-2"
                    >
                      <LayoutDashboard className="w-4 h-4 text-[#2563EB]" /> Dashboard
                    </button>
                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        onLogout();
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-bold text-[#EF4444] hover:bg-rose-50 rounded-xl flex items-center gap-2 mt-1"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button
              onClick={() => onNavigate("login")}
              className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-black text-xs shadow-md shadow-[#2563EB]/20 transition-all"
            >
              Sign In
            </button>
          )}

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-[#EEF2F7] text-[#0F172A] border border-[#E2E8F0]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-[#E2E8F0] bg-[#FFFFFF] px-4 py-4 space-y-2"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-black ${currentView === item.id
                      ? "bg-[#EEF2F7] text-[#2563EB]"
                      : "text-[#64748B] hover:bg-[#EEF2F7]"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#2563EB] text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
