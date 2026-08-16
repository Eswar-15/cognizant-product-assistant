"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Scale,
  MessageSquare,
  Bell,
  Download,
  Zap,
  CheckCircle2,
  Clock,
  ArrowRight,
  SlidersHorizontal,
  Bookmark,
  Activity,
  Cpu,
  ShieldCheck,
  Plus,
  RefreshCw,
} from "lucide-react";

interface DashboardViewProps {
  user: { name: string; email: string } | null;
  notifications: string[];
  onNavigate?: (view: string) => void;
}

export default function DashboardView({ user, notifications, onNavigate }: DashboardViewProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | "alerts" | "history">("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const currentUser = user || { name: "Eswar", email: "eswar@example.com" };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const quickActions = [
    { label: "Compare Laptops", icon: Scale, action: () => onNavigate?.("compare"), color: "bg-blue-50 text-[#2563EB] border-blue-200" },
    { label: "Ask AI Spec Advisor", icon: MessageSquare, action: () => onNavigate?.("chat"), color: "bg-purple-50 text-[#7C3AED] border-purple-200" },
    { label: "View Wishlist", icon: Bookmark, action: () => onNavigate?.("wishlist"), color: "bg-amber-50 text-amber-700 border-amber-200" },
    { label: "Read Buyer Guides", icon: Sparkles, action: () => onNavigate?.("blog"), color: "bg-cyan-50 text-[#0891B2] border-cyan-200" },
  ];

  const compactStats = [
    { label: "Hardware Matrix Scans", value: "24", change: "+4 this week", icon: Scale },
    { label: "AI RAG Sessions", value: "67", change: "99.9% Grounded", icon: MessageSquare },
    { label: "Active Price Alerts", value: "3", change: "2 Price drops", icon: Bell },
    { label: "RAG Engine Status", value: "Online", change: "Latency 14ms", icon: Activity },
  ];

  const recentTimeline = [
    { id: 1, title: "Price drop trigger: ASUS Vivobook 16 OLED", time: "10 mins ago", type: "alert", badge: "Price Alert" },
    { id: 2, title: "Shortlisted HP Pavilion 15 vs ASUS Vivobook", time: "2 hours ago", type: "compare", badge: "Comparison" },
    { id: 3, title: "AI Prompt: 'RTX 4050 vs RTX 3050 gaming FPS'", time: "5 hours ago", type: "ai", badge: "RAG Prompt" },
    { id: 4, title: "Saved Lenovo IdeaPad Slim 5 to Wishlist", time: "Yesterday", type: "wishlist", badge: "Wishlist" },
  ];

  return (
    <div className="py-8 space-y-8 pb-32">
      {/* Top Header & Refresh Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white border border-[#E2E8F0] p-6 rounded-3xl shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#2563EB] to-[#7C3AED] flex items-center justify-center text-white text-2xl font-black shadow-md">
            {currentUser.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">{currentUser.name}&apos;s Control Panel</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-black flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Active
              </span>
            </div>
            <p className="text-xs font-bold text-[#64748B] mt-0.5">{currentUser.email} • Hardware Spec Control Hub</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 bg-[#EEF2F7] hover:bg-[#E2E8F0] text-[#0F172A] rounded-xl text-xs font-black border border-[#E2E8F0] transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-[#2563EB]" : "text-[#64748B]"}`} /> Sync Status
          </button>
        </div>
      </div>

      {/* Quick Action Shortcuts Toolbar */}
      <div className="space-y-3">
        <h2 className="text-xs font-black uppercase text-[#64748B] tracking-wider">Quick Actions Shortcuts</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickActions.map((act, i) => {
            const Icon = act.icon;
            return (
              <motion.button
                key={i}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={act.action}
                className={`p-4 rounded-2xl border ${act.color} flex items-center justify-between shadow-2xs hover:shadow-md transition-all text-left group`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-white/80 shadow-xs">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-xs font-black text-[#0F172A] group-hover:text-[#2563EB] transition-colors">{act.label}</span>
                </div>
                <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Compact Stats Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {compactStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white border border-[#E2E8F0] p-5 rounded-3xl shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase text-[#64748B] tracking-wider">{stat.label}</span>
                <Icon className="w-4 h-4 text-[#2563EB]" />
              </div>
              <div>
                <div className="text-2xl font-black text-[#0F172A]">{stat.value}</div>
                <div className="text-[11px] font-bold text-emerald-700 mt-0.5">{stat.change}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Control Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Live System & Hardware Monitor (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Live RAG Vector Engine Monitor */}
          <div className="bg-white border border-[#E2E8F0] p-6 rounded-3xl shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-[#2563EB]" />
                <h3 className="font-black text-sm text-[#0F172A] uppercase tracking-wider">Live Spec Engine Monitor</h3>
              </div>
              <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                100% Operational
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-bold text-[#0F172A]">
              <div className="p-4 bg-[#EEF2F7] rounded-2xl border border-[#E2E8F0]">
                <div className="text-[10px] font-black text-[#64748B] uppercase">RAG Datasheet Grounding</div>
                <div className="text-lg font-black text-[#2563EB] mt-1">Zero-Hallucination</div>
                <div className="text-[10px] text-[#64748B] mt-0.5">Verified specs database</div>
              </div>
              <div className="p-4 bg-[#EEF2F7] rounded-2xl border border-[#E2E8F0]">
                <div className="text-[10px] font-black text-[#64748B] uppercase">Vector Embedding Index</div>
                <div className="text-lg font-black text-[#0891B2] mt-1">1,240 Tech Specs</div>
                <div className="text-[10px] text-[#64748B] mt-0.5">Updated 10m ago</div>
              </div>
            </div>
          </div>

          {/* Quick Hardware Comparisons List */}
          <div className="bg-white border border-[#E2E8F0] p-6 rounded-3xl shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-sm text-[#0F172A] uppercase tracking-wider flex items-center gap-2">
                <Scale className="w-4.5 h-4.5 text-[#2563EB]" /> Active Hardware Workspaces
              </h3>
              <button onClick={() => onNavigate?.("compare")} className="text-xs font-black text-[#2563EB] hover:underline">
                View Compare Matrix
              </button>
            </div>

            <div className="space-y-3">
              {[
                { title: "ASUS Vivobook 16 vs HP Pavilion 15", category: "Laptop", count: "2 Products" },
                { title: "MSI Modern 15 vs Acer Aspire 5", category: "Laptop", count: "2 Products" },
              ].map((ws, idx) => (
                <div key={idx} className="p-4 bg-[#EEF2F7] border border-[#E2E8F0] rounded-2xl flex items-center justify-between">
                  <div>
                    <div className="font-black text-xs text-[#0F172A]">{ws.title}</div>
                    <div className="text-[10px] font-bold text-[#64748B]">{ws.category} • {ws.count}</div>
                  </div>
                  <button onClick={() => onNavigate?.("compare")} className="p-2 bg-white rounded-xl text-[#2563EB] hover:bg-blue-50 border border-[#E2E8F0] transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Recent Activity Timeline (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-[#E2E8F0] p-6 rounded-3xl shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
              <h3 className="font-black text-sm text-[#0F172A] uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4.5 h-4.5 text-[#2563EB]" /> Recent Activity Timeline
              </h3>
              <span className="text-[10px] font-black text-[#64748B] bg-[#EEF2F7] px-2 py-0.5 rounded-md">Live Stream</span>
            </div>

            <div className="space-y-3">
              {recentTimeline.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ x: 3 }}
                  className="p-3.5 rounded-2xl bg-[#EEF2F7] border border-[#E2E8F0] flex items-start gap-3"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB] mt-1 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-black text-[#0F172A] truncate">{item.title}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[9px] font-black uppercase text-[#2563EB] bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">
                        {item.badge}
                      </span>
                      <span className="text-[10px] font-bold text-[#64748B]">{item.time}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
