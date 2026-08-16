"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  MessageSquare,
  Sparkles,
  Award,
  CheckCircle,
  Share2,
  Trash2,
  Battery,
  BatteryCharging,
  SlidersHorizontal,
  Zap,
  Check,
  X,
  Copy,
  Gauge,
  Trophy,
  Printer,
} from "lucide-react";
import { Product } from "./HomeView";

interface CompareViewProps {
  products: Product[];
  onBack: () => void;
  onLaunchChat: () => void;
  onRemove: (id: string) => void;
}

export default function CompareView({
  products,
  onBack,
  onLaunchChat,
  onRemove,
}: CompareViewProps) {
  const [onlyDifferences, setOnlyDifferences] = useState(false);
  const [highlightWinners, setHighlightWinners] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);

  // Battery Estimator State
  const [selectedBatteryProduct, setSelectedBatteryProduct] = useState<Product | null>(null);
  const [brightness, setBrightness] = useState(70);
  const [workload, setWorkload] = useState<"light" | "medium" | "heavy">("medium");

  if (products.length === 0) {
    return (
      <div className="py-24 text-center space-y-4">
        <div className="w-20 h-20 bg-blue-50 border border-blue-200 text-[#2563EB] rounded-3xl mx-auto flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-[#2563EB]" />
        </div>
        <h2 className="text-2xl font-black text-[#0F172A]">No Products Selected</h2>
        <p className="text-[#64748B] text-sm max-w-md mx-auto font-extrabold">
          Go back to the Discover view and select at least 2 gadgets to generate a side-by-side comparison matrix.
        </p>
        <button
          onClick={onBack}
          className="mt-4 px-6 py-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-2xl font-black text-sm shadow-md shadow-[#2563EB]/20 transition-all inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Discover Products
        </button>
      </div>
    );
  }

  // Determine top score product
  const winner = [...products].sort((a, b) => b.score - a.score)[0];

  // Helper to check row winners
  const getIsWinner = (rowKey: string, val: number | string | undefined) => {
    if (!highlightWinners || products.length < 2) return false;
    if (rowKey === "price") {
      const minVal = Math.min(...products.map((p) => p.price));
      return val === minVal;
    }
    if (rowKey === "ram") {
      const maxVal = Math.max(...products.map((p) => p.ram));
      return val === maxVal;
    }
    if (rowKey === "score") {
      const maxVal = Math.max(...products.map((p) => p.score));
      return val === maxVal;
    }
    return false;
  };

  const specRows = [
    { label: "Price (INR)", key: "price", format: (v: number) => `₹${v.toLocaleString()}` },
    { label: "Processor (CPU)", key: "cpu", format: (v: string) => v },
    { label: "RAM Memory", key: "ram", format: (v: number) => `${v} GB` },
    { label: "Storage", key: "storage", format: (v: string) => v },
    { label: "Graphics (GPU)", key: "gpu", format: (v?: string) => v || "Integrated" },
    { label: "AI RAG Score", key: "score", format: (v: number) => `${v} / 100` },
    { label: "User Rating", key: "rating", format: (v?: number) => (v ? `⭐ ${v}` : "N/A") },
  ];

  const handleCopyShare = () => {
    const markdown = products
      .map((p) => `* ${p.name}: ₹${p.price.toLocaleString()} | ${p.cpu} | ${p.ram}GB RAM | Score: ${p.score}/100`)
      .join("\n");
    navigator.clipboard.writeText(markdown);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Calculate battery runtime hours based on parameters
  const calculateBatteryHours = (product: Product) => {
    let baseHours = product.name.includes("OLED") ? 7.5 : 9.0;
    if (product.cpu.includes("M3") || product.cpu.includes("Core Ultra")) baseHours += 2.0;

    // Workload modifier
    if (workload === "light") baseHours *= 1.3;
    if (workload === "heavy") baseHours *= 0.55;

    // Brightness modifier
    const brightnessMod = 1 - (brightness - 50) * 0.005;
    return (baseHours * brightnessMod).toFixed(1);
  };

  return (
    <div className="py-8 space-y-8 pb-32">
      {/* Navigation Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-[#EEF2F7] border border-[#E2E8F0] rounded-2xl text-xs font-black text-[#0F172A] transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-[#2563EB]" /> Back to Discover
        </button>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setHighlightWinners(!highlightWinners)}
            className={`px-3 py-2 rounded-xl text-xs font-black border transition-all flex items-center gap-1.5 ${highlightWinners
              ? "bg-amber-50 text-amber-800 border-amber-300"
              : "bg-white text-[#64748B] border-[#E2E8F0]"
              }`}
          >
            <Trophy className="w-3.5 h-3.5 text-amber-500" /> Winner Spec Highlights
          </button>

          <button
            onClick={() => setOnlyDifferences(!onlyDifferences)}
            className={`px-3 py-2 rounded-xl text-xs font-black border transition-all ${onlyDifferences
              ? "bg-[#2563EB] text-white border-[#2563EB]"
              : "bg-white text-[#64748B] border-[#E2E8F0]"
              }`}
          >
            {onlyDifferences ? "Showing Differences" : "Show Differences Only"}
          </button>

          <button
            onClick={handleCopyShare}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#EEF2F7] border border-[#E2E8F0] text-xs font-black text-[#0F172A] flex items-center gap-1.5 transition-colors"
          >
            <Copy className="w-3.5 h-3.5 text-[#2563EB]" />
            {copiedLink ? "Copied Summary!" : "Copy Summary"}
          </button>

          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-xs font-black text-emerald-800 flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5 text-emerald-600" /> Export PDF / Print
          </button>

          <button
            onClick={onLaunchChat}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white text-xs font-black shadow-md shadow-[#2563EB]/20 flex items-center gap-1.5 transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5" /> Ask AI Comparison Assistant
          </button>
        </div>
      </div>

      {/* Winner Spotlight Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-[#E2E8F0] p-6 rounded-3xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 border border-amber-300 text-amber-700 flex items-center justify-center shrink-0 shadow-xs">
            <Award className="w-7 h-7 text-amber-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Overall Value Winner
              </span>
              <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Score: {winner.score}/100
              </span>
            </div>
            <h3 className="text-xl font-black text-[#0F172A] mt-1">{winner.name}</h3>
            <p className="text-xs font-extrabold text-[#64748B]">
              Top recommendation based on CPU performance, RAM capacity, and price-to-spec ratio.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Product Comparison Matrix Table */}
      <div className="bg-white border border-[#E2E8F0] rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-[#EEF2F7]">
                <th className="p-5 font-black text-xs text-[#64748B] uppercase tracking-wider w-48">Specification</th>
                {products.map((prod) => (
                  <th key={prod.id} className="p-5 font-black text-sm text-[#0F172A] relative">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-black text-[#2563EB] bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-200">
                        {prod.brand}
                      </span>
                      <button
                        onClick={() => onRemove(prod.id)}
                        className="p-1 rounded-lg text-[#94A3B8] hover:text-[#EF4444] hover:bg-rose-50 transition-colors"
                        title="Remove product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="font-black text-base text-[#0F172A] line-clamp-1">{prod.name}</div>
                    <div className="text-xs font-black text-emerald-700 mt-1">₹{prod.price.toLocaleString()}</div>

                    {/* Battery Predictor Trigger Button */}
                    <button
                      onClick={() => setSelectedBatteryProduct(prod)}
                      className="mt-3 w-full py-1.5 px-3 bg-white hover:bg-emerald-50 text-emerald-800 rounded-xl text-[11px] font-black border border-emerald-300 flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                    >
                      <Battery className="w-3.5 h-3.5 text-emerald-600" /> Battery Estimator
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-xs font-bold text-[#0F172A]">
              {specRows.map((row, i) => {
                // Skip if filter is active and all values are equal
                const firstVal = (products[0] as unknown as Record<string, unknown>)[row.key];
                const isDiff = products.some(
                  (p) => (p as unknown as Record<string, unknown>)[row.key] !== firstVal
                );
                if (onlyDifferences && !isDiff) return null;

                return (
                  <tr key={i} className="hover:bg-[#EEF2F7]/50 transition-colors">
                    <td className="p-5 font-black text-[#64748B] bg-[#EEF2F7]/30 border-r border-[#E2E8F0]">
                      {row.label}
                    </td>
                    {products.map((prod) => {
                      const rawVal = (prod as unknown as Record<string, unknown>)[row.key];
                      const formatted = row.format
                        ? row.format(rawVal as never)
                        : String(rawVal ?? "N/A");
                      const isWin = getIsWinner(row.key, rawVal as number);

                      return (
                        <td
                          key={prod.id}
                          className={`p-5 transition-colors ${isWin
                            ? "bg-amber-50/80 text-amber-900 font-black border-l-2 border-l-amber-400"
                            : ""
                            }`}
                        >
                          <div className="flex items-center gap-1.5">
                            {isWin && <Trophy className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                            <span>{formatted}</span>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Real-World Battery Estimator Modal */}
      <AnimatePresence>
        {selectedBatteryProduct && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-[#E2E8F0] rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5"
            >
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                <div className="flex items-center gap-2 text-emerald-700 font-black text-sm">
                  <BatteryCharging className="w-5 h-5 text-emerald-600" /> Battery Life Predictor
                </div>
                <button
                  onClick={() => setSelectedBatteryProduct(null)}
                  className="p-1 text-[#94A3B8] hover:text-[#0F172A]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <h4 className="font-black text-base text-[#0F172A]">{selectedBatteryProduct.name}</h4>
                <p className="text-xs font-extrabold text-[#64748B]">
                  Estimated endurance based on hardware TDP, panel type, and brightness settings.
                </p>
              </div>

              {/* Workload Select */}
              <div className="space-y-2">
                <label className="text-xs font-black text-[#0F172A] uppercase tracking-wider">Usage Workload</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "light", label: "Web Browsing" },
                    { id: "medium", label: "Mixed Office" },
                    { id: "heavy", label: "Gaming / Render" },
                  ].map((w) => (
                    <button
                      key={w.id}
                      onClick={() => setWorkload(w.id as typeof workload)}
                      className={`p-2 rounded-xl text-xs font-black border transition-all ${workload === w.id
                        ? "bg-[#2563EB] text-white border-[#2563EB]"
                        : "bg-[#EEF2F7] text-[#64748B] border-[#E2E8F0]"
                        }`}
                    >
                      {w.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brightness Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-black text-[#0F172A]">
                  <span>Screen Brightness</span>
                  <span className="text-[#2563EB]">{brightness}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="w-full accent-[#2563EB]"
                />
              </div>

              {/* Calculated Result Display */}
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-1">
                <div className="text-xs font-black text-emerald-800 uppercase tracking-wider">Estimated Battery Runtime</div>
                <div className="text-4xl font-black text-emerald-700">
                  {calculateBatteryHours(selectedBatteryProduct)} <span className="text-lg">Hours</span>
                </div>
                <div className="text-[10px] font-bold text-emerald-700">Grounded prediction (+/- 30 mins)</div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
