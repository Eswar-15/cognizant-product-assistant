"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Laptop,
  Smartphone,
  Camera,
  Layers,
  Wind,
  Search,
  SlidersHorizontal,
  Sparkles,
  Cpu,
  Check,
  Plus,
  ArrowRight,
  Heart,
  Star,
  Eye,
  Filter,
  Bell,
  MessageSquarePlus,
  X,
  Zap,
  CheckCircle2,
  Gamepad2,
  Code2,
  Video,
  Briefcase,
  Download,
  Gauge,
  Activity,
  Table,
} from "lucide-react";

export interface Product {
  id: string;
  brand: string;
  name: string;
  category: string;
  price: number;
  cpu: string;
  ram: number;
  storage: string;
  gpu?: string;
  score: number;
  image: string;
  rating?: number;
  reviews?: number;
  badge?: string;
  specsSummary?: string;
  pros?: string[];
  cons?: string[];
  fpsData?: { game: string; fps: number; resolution: string }[];
}

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "LAP_001",
    brand: "ASUS",
    name: "Vivobook 16 OLED",
    category: "Laptop",
    price: 64990,
    cpu: "Intel Core i7 13th Gen",
    ram: 16,
    storage: "512 GB SSD",
    gpu: "NVIDIA RTX 3050",
    score: 94,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop&q=80",
    rating: 4.7,
    reviews: 1254,
    badge: "Editor's Pick",
    specsSummary: "Stunning 3.2K 120Hz OLED screen paired with 13th Gen i7 power for creator & multitasking heavy workloads.",
    pros: ["100% DCI-P3 OLED Display", "Lightweight 1.88kg Chassis", "Fast 90W Type-C Charging"],
    cons: ["Slightly high power draw under full load"],
    fpsData: [
      { game: "GTA V", fps: 110, resolution: "1080p Very High" },
      { game: "Valorant", fps: 240, resolution: "1080p High" },
      { game: "Cyberpunk 2077", fps: 52, resolution: "1080p Medium" },
      { game: "CS2", fps: 165, resolution: "1080p High" },
    ],
  },
  {
    id: "LAP_002",
    brand: "HP",
    name: "Pavilion 15 Gaming",
    category: "Laptop",
    price: 68290,
    cpu: "AMD Ryzen 7 7735HS",
    ram: 16,
    storage: "512 GB SSD",
    gpu: "NVIDIA RTX 4050",
    score: 89,
    image: "https://images.unsplash.com/photo-1544731612-de292439cc67?w=600&auto=format&fit=crop&q=80",
    rating: 4.5,
    reviews: 892,
    badge: "Best GPU",
    specsSummary: "Dedicated RTX 4050 GPU with DLSS 3 frame generation for smooth 1080p high refresh gaming.",
    pros: ["NVIDIA DLSS 3 Support", "Dual Fan Cooling Architecture", "Upgradable RAM Slot"],
    cons: ["IPS panel color gamut is 45% NTSC"],
    fpsData: [
      { game: "GTA V", fps: 135, resolution: "1080p Very High" },
      { game: "Valorant", fps: 280, resolution: "1080p High" },
      { game: "Cyberpunk 2077", fps: 78, resolution: "1080p High DLSS" },
      { game: "CS2", fps: 195, resolution: "1080p High" },
    ],
  },
  {
    id: "LAP_003",
    brand: "Lenovo",
    name: "IdeaPad Slim 5",
    category: "Laptop",
    price: 57990,
    cpu: "AMD Ryzen 5 7530U",
    ram: 8,
    storage: "512 GB SSD",
    gpu: "Integrated Radeon",
    score: 82,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=80",
    rating: 4.2,
    reviews: 678,
    badge: "Budget Pick",
    specsSummary: "Exceptional 10+ hour battery life with ultra-quiet fan profiles and crisp metal unibody design.",
    pros: ["10+ Hours Battery Life", "All-Metal Durable Build", "Backlit Keyboard"],
    cons: ["8GB RAM is non-upgradable"],
    fpsData: [
      { game: "GTA V", fps: 55, resolution: "720p Normal" },
      { game: "Valorant", fps: 120, resolution: "1080p Low" },
      { game: "CS2", fps: 80, resolution: "720p Low" },
    ],
  },
  {
    id: "LAP_004",
    brand: "Dell",
    name: "Inspiron 15 3520",
    category: "Laptop",
    price: 62990,
    cpu: "Intel Core i5 12th Gen",
    ram: 16,
    storage: "512 GB SSD",
    gpu: "Integrated Intel Iris",
    score: 79,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&auto=format&fit=crop&q=80",
    rating: 4.0,
    reviews: 432,
    specsSummary: "Reliable daily driver laptop built with lift hinge design for ergonomic typing.",
    pros: ["120Hz Refresh Rate Display", "Ergonomic Lift Hinge", "Spill-resistant Keyboard"],
    cons: ["Integrated graphics limited to light casual games"],
    fpsData: [
      { game: "GTA V", fps: 48, resolution: "720p Medium" },
      { game: "Valorant", fps: 110, resolution: "1080p Medium" },
    ],
  },
  {
    id: "LAP_005",
    brand: "Acer",
    name: "Aspire 5 Slim",
    category: "Laptop",
    price: 55990,
    cpu: "Intel Core i5 13th Gen",
    ram: 16,
    storage: "512 GB SSD",
    gpu: "NVIDIA RTX 2050",
    score: 86,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80",
    rating: 4.3,
    reviews: 756,
    badge: "Best Value",
    specsSummary: "Entry discrete RTX 2050 graphics under ₹56,000 for budget video editing and coding.",
    pros: ["Dedicated RTX GPU under ₹56k", "16GB Dual Channel RAM", "Wi-Fi 6E connectivity"],
    cons: ["Plastic bottom chassis"],
    fpsData: [
      { game: "GTA V", fps: 85, resolution: "1080p High" },
      { game: "Valorant", fps: 180, resolution: "1080p High" },
      { game: "Cyberpunk 2077", fps: 40, resolution: "1080p Low" },
    ],
  },
  {
    id: "LAP_006",
    brand: "MSI",
    name: "Modern 15 B13M",
    category: "Laptop",
    price: 72990,
    cpu: "Intel Core i7 13th Gen",
    ram: 16,
    storage: "1 TB SSD",
    gpu: "NVIDIA RTX 4060",
    score: 91,
    image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&auto=format&fit=crop&q=80",
    rating: 4.6,
    reviews: 345,
    badge: "Premium",
    specsSummary: "Heavy duty 1TB NVMe SSD storage and 13th Gen i7 muscle for demanding workloads.",
    pros: ["1TB NVMe Gen4 Storage", "Military-grade MIL-STD-810G Build", "Hi-Res Audio Support"],
    cons: ["Power adapter is slightly bulky"],
    fpsData: [
      { game: "GTA V", fps: 155, resolution: "1080p Ultra" },
      { game: "Valorant", fps: 310, resolution: "1080p High" },
      { game: "Cyberpunk 2077", fps: 92, resolution: "1080p Ultra DLSS" },
      { game: "CS2", fps: 230, resolution: "1080p High" },
    ],
  },
];

interface HomeViewProps {
  onCompare: (selectedItems: Product[]) => void;
  shortlisted: Product[];
  setShortlisted: React.Dispatch<React.SetStateAction<Product[]>>;
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  onSetPriceAlert?: (product: Product, targetPrice: number) => void;
}

export default function HomeView({
  onCompare,
  shortlisted,
  setShortlisted,
  wishlist,
  toggleWishlist,
  onSetPriceAlert,
}: HomeViewProps) {
  const [activeCategory, setActiveCategory] = useState("Laptop");
  const [datasetSource, setDatasetSource] = useState<"default" | "custom">("default");
  const [searchMode, setSearchMode] = useState<"novice" | "advanced">("novice");
  const [naturalQuery, setNaturalQuery] = useState("");
  const [brandFilter, setBrandFilter] = useState("All");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [minRam, setMinRam] = useState(8);
  const [sortBy, setSortBy] = useState<"score" | "price-low" | "price-high" | "rating" | "match">("match");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Usage Profile & Presets
  const [usageProfile, setUsageProfile] = useState<"gaming" | "coding" | "editing" | "work">("gaming");

  // NEW FEATURE Modals & Drawers
  const [fpsModalProduct, setFpsModalProduct] = useState<Product | null>(null);
  const [showQuickMatrixDrawer, setShowQuickMatrixDrawer] = useState(false);

  const [alertProduct, setAlertProduct] = useState<Product | null>(null);
  const [targetPriceInput, setTargetPriceInput] = useState<number>(50000);
  const [alertSuccessMsg, setAlertSuccessMsg] = useState<string | null>(null);

  const [reviewProduct, setReviewProduct] = useState<Product | null>(null);
  const [userRating, setUserRating] = useState<number>(5);
  const [userComment, setUserComment] = useState<string>("");
  const [reviewSubmitted, setReviewSubmitted] = useState<boolean>(false);

  const [quickSummaryProduct, setQuickSummaryProduct] = useState<Product | null>(null);

  const categories = [
    { id: "Laptop", label: "Laptops", icon: Laptop, count: 6 },
    { id: "Mobile", label: "Smartphones", icon: Smartphone, count: 0 },
    { id: "Camera", label: "Cameras", icon: Camera, count: 0 },
  ];

  const usageOptions = [
    { id: "gaming", label: "Gaming", icon: Gamepad2 },
    { id: "coding", label: "Programming", icon: Code2 },
    { id: "editing", label: "Video Editing", icon: Video },
    { id: "work", label: "Daily Work", icon: Briefcase },
  ];

  const calculateMatchScore = (prod: Product, profile: typeof usageProfile) => {
    let match = 70;
    if (profile === "gaming") {
      if (prod.gpu?.includes("4060")) match += 28;
      else if (prod.gpu?.includes("4050")) match += 25;
      else if (prod.gpu?.includes("3050")) match += 20;
      else if (prod.gpu?.includes("2050")) match += 14;
      else match -= 20;
    } else if (profile === "coding") {
      if (prod.ram >= 16) match += 15;
      if (prod.cpu.includes("i7") || prod.cpu.includes("Ryzen 7")) match += 13;
    } else if (profile === "editing") {
      if (prod.brand === "ASUS" && prod.name.includes("OLED")) match += 26;
      if (prod.ram >= 16) match += 10;
    } else if (profile === "work") {
      if (prod.price <= 60000) match += 20;
      if (prod.ram >= 8) match += 10;
    }
    return Math.min(Math.max(match, 50), 99);
  };

  const filteredAndSortedProducts = useMemo(() => {
    let products = SAMPLE_PRODUCTS.filter((prod) => {
      if (searchMode === "novice") {
        if (!naturalQuery.trim()) return true;
        const q = naturalQuery.toLowerCase();
        return (
          prod.brand.toLowerCase().includes(q) ||
          prod.name.toLowerCase().includes(q) ||
          prod.cpu.toLowerCase().includes(q) ||
          (q.includes("rtx") && prod.gpu && prod.gpu.includes("RTX")) ||
          (q.includes("gaming") && prod.gpu && !prod.gpu.includes("Integrated")) ||
          (q.includes("60000") && prod.price <= 60000) ||
          (q.includes("70000") && prod.price <= 70000)
        );
      } else {
        const matchBrand = brandFilter === "All" || prod.brand === brandFilter;
        const matchPrice = prod.price <= maxPrice;
        const matchRam = prod.ram >= minRam;
        return matchBrand && matchPrice && matchRam;
      }
    });

    switch (sortBy) {
      case "match":
        products.sort((a, b) => calculateMatchScore(b, usageProfile) - calculateMatchScore(a, usageProfile));
        break;
      case "price-low":
        products.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        products.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        products.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "score":
      default:
        products.sort((a, b) => b.score - a.score);
        break;
    }

    return products;
  }, [naturalQuery, searchMode, brandFilter, maxPrice, minRam, sortBy, usageProfile]);

  const toggleShortlist = (prod: Product) => {
    if (shortlisted.some((p) => p.id === prod.id)) {
      setShortlisted(shortlisted.filter((p) => p.id !== prod.id));
    } else {
      setShortlisted([...shortlisted, prod]);
    }
  };

  const handleExportCSV = () => {
    const headers = "ID,Brand,Name,Category,Price(INR),CPU,RAM(GB),Storage,GPU,Score,Rating\n";
    const rows = filteredAndSortedProducts
      .map(
        (p) =>
          `"${p.id}","${p.brand}","${p.name}","${p.category}",${p.price},"${p.cpu}",${p.ram},"${p.storage}","${p.gpu || ""}",${p.score},${p.rating || ""}`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `SmartCompare_${activeCategory}_Specs.csv`;
    a.click();
  };

  const handleCreatePriceAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (alertProduct && onSetPriceAlert) {
      onSetPriceAlert(alertProduct, targetPriceInput);
      setAlertSuccessMsg(`Alert active for ${alertProduct.name} at ₹${targetPriceInput.toLocaleString()}!`);
      setTimeout(() => {
        setAlertSuccessMsg(null);
        setAlertProduct(null);
      }, 1600);
    }
  };

  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    setReviewSubmitted(true);
    setTimeout(() => {
      setReviewSubmitted(false);
      setReviewProduct(null);
      setUserComment("");
    }, 1500);
  };

  return (
    <div className="py-8 space-y-8 pb-32">
      {/* Hero Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 border border-sky-200 text-sky-900 text-xs font-black shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-sky-600 animate-spin" style={{ animationDuration: "6s" }} />
          Zero-Hallucination RAG Comparison Engine v2
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]"
        >
          Discover & Compare <span className="gradient-text">Hardware.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-700 text-base sm:text-lg font-bold max-w-xl mx-auto"
        >
          Calculated match scores, instant gaming FPS benchmarks, and verified datasheet grounding.
        </motion.p>
      </div>

      {/* NEW FEATURE 1: Spec Match Profile Bar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-3"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4.5 h-4.5 text-sky-600" />
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
              Usage Match Calculator
            </h3>
          </div>
          <span className="text-xs font-bold text-slate-600">Calculates live score for each product</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {usageOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = usageProfile === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => {
                  setUsageProfile(opt.id as typeof usageProfile);
                  setSortBy("match");
                }}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-xs font-black transition-all border ${isSelected
                  ? "bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-500/20 scale-[1.02]"
                  : "bg-slate-50 text-slate-800 border-slate-200 hover:bg-sky-50 hover:border-sky-300"
                  }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? "text-white" : "text-slate-600"}`} />
                {opt.label}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Main Search & Filter Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm"
      >
        {/* Categories & Action Buttons */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-sm transition-all whitespace-nowrap ${isActive
                    ? "bg-sky-600 text-white shadow-md shadow-sky-500/20"
                    : "bg-slate-50 text-slate-800 hover:bg-sky-50 border border-slate-200"
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowQuickMatrixDrawer(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 text-slate-900 hover:bg-sky-50 border border-slate-300 text-xs font-black transition-colors"
            >
              <Table className="w-3.5 h-3.5 text-sky-600" /> Quick Specs Drawer
            </button>

            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 text-slate-900 hover:bg-sky-50 border border-slate-300 text-xs font-black transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-slate-700" /> Export CSV
            </button>
          </div>
        </div>

        {/* Search Toolbar */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900">Search {activeCategory}s</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchMode(searchMode === "novice" ? "advanced" : "novice")}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 text-xs font-black hover:bg-sky-50 transition-colors"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                {searchMode === "novice" ? "Filters" : "AI Query"}
              </button>
            </div>
          </div>

          {searchMode === "novice" ? (
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  value={naturalQuery}
                  onChange={(e) => setNaturalQuery(e.target.value)}
                  placeholder="e.g. 'RTX 4050 laptop under ₹70,000'"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-slate-900 text-sm font-bold focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all placeholder:text-slate-500"
                />
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-black text-slate-700">
                <span className="flex items-center gap-1"><Filter className="w-3.5 h-3.5 text-sky-600" /> Presets:</span>
                {["RTX Graphics Laptops", "Laptops under ₹60000", "ASUS Vivobook", "Best Value"].map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => setNaturalQuery(prompt)}
                    className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-sky-50 text-slate-900 border border-slate-200 transition-all font-bold"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-900">Brand</label>
                <select
                  value={brandFilter}
                  onChange={(e) => setBrandFilter(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm font-bold"
                >
                  <option value="All">All Brands</option>
                  <option value="ASUS">ASUS</option>
                  <option value="HP">HP</option>
                  <option value="Lenovo">Lenovo</option>
                  <option value="Dell">Dell</option>
                  <option value="Acer">Acer</option>
                  <option value="MSI">MSI</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-900">Max Budget: ₹{maxPrice.toLocaleString()}</label>
                <input
                  type="range"
                  min={40000}
                  max={120000}
                  step={5000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-sky-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-900">Minimum RAM</label>
                <select
                  value={minRam}
                  onChange={(e) => setMinRam(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm font-bold"
                >
                  <option value={4}>4 GB RAM</option>
                  <option value={8}>8 GB RAM</option>
                  <option value={16}>16 GB RAM</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Results Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Matching Hardware</h2>
          <p className="text-xs text-slate-700 font-bold mt-0.5">{filteredAndSortedProducts.length} items found</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-slate-800">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs font-black text-slate-900"
          >
            <option value="match">% Match Profile</option>
            <option value="score">AI Score</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Grid of Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedProducts.map((prod, i) => {
          const isSelected = shortlisted.some((p) => p.id === prod.id);
          const isWishlisted = wishlist.some((p) => p.id === prod.id);
          const matchPercent = calculateMatchScore(prod, usageProfile);

          return (
            <motion.div
              key={prod.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className={`bg-white border border-slate-200 rounded-3xl p-5 flex flex-col justify-between transition-all group shadow-sm hover:shadow-xl ${isSelected ? "ring-2 ring-sky-500 border-sky-500" : ""
                }`}
            >
              <div>
                {/* Badges */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase px-2 py-1 bg-slate-100 text-slate-800 rounded-lg border border-slate-200">
                      {prod.brand}
                    </span>
                    <span className="text-[9px] font-black uppercase px-2 py-1 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200">
                      {matchPercent}% Match
                    </span>
                  </div>
                  <div className="flex items-center gap-1 px-2.5 py-1 bg-sky-50 text-sky-900 border border-sky-200 rounded-lg text-xs font-black">
                    <Sparkles className="w-3 h-3 text-sky-600" />
                    <span>{prod.score}/100</span>
                  </div>
                </div>

                {/* Product Image */}
                <div className="h-44 w-full rounded-2xl overflow-hidden mb-4 bg-slate-100 relative">
                  <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

                  {/* Floating Action Overlay */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setQuickSummaryProduct(prod)}
                      title="Quick Datasheet Summary"
                      className="p-2 rounded-xl bg-white/95 text-slate-800 hover:text-sky-600 shadow-md transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleWishlist(prod)}
                      className={`p-2 rounded-xl bg-white/95 shadow-md transition-colors ${isWishlisted ? "text-rose-600" : "text-slate-800 hover:text-rose-600"
                        }`}
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? "fill-rose-600" : ""}`} />
                    </button>
                    <button
                      onClick={() => setAlertProduct(prod)}
                      title="Set Price Alert"
                      className="p-2 rounded-xl bg-white/95 text-slate-800 hover:text-sky-600 shadow-md transition-colors"
                    >
                      <Bell className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setReviewProduct(prod)}
                      title="Add Review"
                      className="p-2 rounded-xl bg-white/95 text-slate-800 hover:text-indigo-600 shadow-md transition-colors"
                    >
                      <MessageSquarePlus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Title & Rating */}
                <h3 className="font-black text-lg text-slate-900 tracking-tight leading-snug">{prod.name}</h3>
                {prod.rating && (
                  <div className="flex items-center gap-1.5 mt-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-black text-slate-800">{prod.rating} ({prod.reviews})</span>
                  </div>
                )}

                <div className="mt-2.5 text-2xl font-black text-slate-900">₹{prod.price.toLocaleString()}</div>

                {/* Key Specs */}
                <div className="grid grid-cols-2 gap-2 mt-4 text-xs font-bold text-slate-800">
                  <div className="flex items-center gap-1.5 p-2 bg-slate-50 border border-slate-200 rounded-xl">
                    <Cpu className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <span className="truncate">{prod.cpu.split(" ").slice(-3).join(" ")}</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-2 bg-slate-50 border border-slate-200 rounded-xl">
                    <Layers className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>{prod.ram} GB RAM</span>
                  </div>
                </div>

                {/* NEW FEATURE 2: FPS Predictor Trigger */}
                {prod.fpsData && (
                  <button
                    onClick={() => setFpsModalProduct(prod)}
                    className="w-full mt-3 flex items-center justify-between px-3 py-2 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-xl text-xs font-black text-sky-800 transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <Gauge className="w-3.5 h-3.5 text-sky-600" /> Gaming FPS Benchmark
                    </span>
                    <span className="text-[10px] bg-white px-2 py-0.5 rounded-md font-black border border-sky-200 text-sky-700">
                      View FPS
                    </span>
                  </button>
                )}
              </div>

              {/* Compare Button */}
              <div className="pt-4 mt-4 border-t border-slate-100">
                <button
                  onClick={() => toggleShortlist(prod)}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-black transition-all ${isSelected
                    ? "bg-sky-600 text-white shadow-md shadow-sky-500/25"
                    : "bg-slate-100 hover:bg-sky-50 hover:text-sky-700 text-slate-900 border border-slate-200"
                    }`}
                >
                  {isSelected ? <><Check className="w-4 h-4" /> Selected</> : <><Plus className="w-4 h-4" /> Add to Compare</>}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Floating Compare Dock */}
      <AnimatePresence>
        {shortlisted.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4"
          >
            <div className="bg-white/95 backdrop-blur-md border border-slate-300 rounded-2xl p-4 shadow-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center font-black text-white text-sm">
                  {shortlisted.length}
                </div>
                <div>
                  <div className="font-black text-sm text-slate-900">Items Shortlisted</div>
                  <div className="text-xs text-slate-600 font-bold truncate max-w-xs">
                    {shortlisted.map((p) => p.name).join(" vs ")}
                  </div>
                </div>
              </div>

              <button
                onClick={() => onCompare(shortlisted)}
                disabled={shortlisted.length < 2}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-black text-sm transition-all ${shortlisted.length >= 2
                  ? "bg-sky-600 text-white shadow-md shadow-sky-500/25 hover:bg-sky-700"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
              >
                {shortlisted.length < 2 ? "Need 2+" : "Compare Now"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NEW FEATURE: FPS Predictor Modal */}
      <AnimatePresence>
        {fpsModalProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative"
            >
              <button onClick={() => setFpsModalProduct(null)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 rounded-xl">
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 border border-sky-200 flex items-center justify-center">
                  <Gauge className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-lg">Gaming FPS Predictor</h3>
                  <p className="text-xs text-slate-600 font-bold">{fpsModalProduct.name}</p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 mb-4 text-xs font-bold text-slate-800 flex items-center justify-between">
                <span>GPU: {fpsModalProduct.gpu || "Integrated"}</span>
                <span className="text-sky-700 font-black">{fpsModalProduct.cpu.split(" ").slice(-2).join(" ")}</span>
              </div>

              <div className="space-y-2 mb-4 max-h-60 overflow-y-auto">
                {fpsModalProduct.fpsData?.map((game, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-sky-50/70 border border-sky-100 rounded-xl">
                    <div>
                      <div className="text-xs font-black text-slate-900">{game.game}</div>
                      <div className="text-[10px] text-slate-600 font-bold">{game.resolution}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-base font-black text-sky-700">{game.fps} FPS</div>
                      <div className="text-[9px] font-black text-emerald-600">Smooth</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NEW FEATURE: Quick Spec Drawer Modal */}
      <AnimatePresence>
        {showQuickMatrixDrawer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative max-h-[85vh] overflow-y-auto"
            >
              <button onClick={() => setShowQuickMatrixDrawer(false)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 rounded-xl">
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 border border-sky-200 flex items-center justify-center">
                  <Table className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-xl">Quick Spec Matrix Breakdown</h3>
                  <p className="text-xs text-slate-600 font-bold">Instant side-by-side view of loaded hardware</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-bold text-slate-900 border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="p-2 font-black text-slate-600 uppercase text-[10px]">Model</th>
                      <th className="p-2 font-black text-slate-600 uppercase text-[10px]">Price</th>
                      <th className="p-2 font-black text-slate-600 uppercase text-[10px]">CPU</th>
                      <th className="p-2 font-black text-slate-600 uppercase text-[10px]">RAM</th>
                      <th className="p-2 font-black text-slate-600 uppercase text-[10px]">GPU</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SAMPLE_PRODUCTS.map((p) => (
                      <tr key={p.id} className="border-b border-slate-100 hover:bg-sky-50/50 transition-colors">
                        <td className="p-2 font-black text-slate-900">{p.name}</td>
                        <td className="p-2 text-sky-700 font-black">₹{p.price.toLocaleString()}</td>
                        <td className="p-2 text-slate-800">{p.cpu}</td>
                        <td className="p-2 text-slate-800">{p.ram} GB</td>
                        <td className="p-2 text-slate-800">{p.gpu || "Integrated"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Summary Modal */}
      <AnimatePresence>
        {quickSummaryProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative"
            >
              <button onClick={() => setQuickSummaryProduct(null)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 rounded-xl">
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 border border-sky-200 flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-xl">AI Datasheet Summary</h3>
                  <p className="text-xs text-slate-600 font-bold">{quickSummaryProduct.name}</p>
                </div>
              </div>

              <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200 mb-4">
                <p className="text-xs font-bold text-slate-800 leading-relaxed">
                  {quickSummaryProduct.specsSummary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="text-lg font-black text-slate-900">₹{quickSummaryProduct.price.toLocaleString()}</div>
                <button
                  onClick={() => {
                    toggleShortlist(quickSummaryProduct);
                    setQuickSummaryProduct(null);
                  }}
                  className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-black text-xs"
                >
                  Add to Compare
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Price Alert Tracker Modal */}
      <AnimatePresence>
        {alertProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative"
            >
              <button onClick={() => setAlertProduct(null)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 rounded-xl">
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center">
                  <Bell className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-lg">Set Price Alert</h3>
                  <p className="text-xs text-slate-600 font-bold">{alertProduct.name}</p>
                </div>
              </div>

              {alertSuccessMsg ? (
                <div className="p-4 bg-emerald-50 text-emerald-900 rounded-2xl border border-emerald-200 text-center font-black text-xs">
                  {alertSuccessMsg}
                </div>
              ) : (
                <form onSubmit={handleCreatePriceAlert} className="space-y-4">
                  <div>
                    <label className="text-xs font-black text-slate-900 block mb-1.5">Target Price (₹)</label>
                    <input
                      type="number"
                      value={targetPriceInput}
                      onChange={(e) => setTargetPriceInput(Number(e.target.value))}
                      step={1000}
                      min={10000}
                      className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm font-black"
                    />
                  </div>
                  <button type="submit" className="w-full py-3 bg-sky-600 text-white font-black text-sm rounded-xl shadow-md shadow-sky-500/20">
                    Activate Alert
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Review Modal */}
      <AnimatePresence>
        {reviewProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative"
            >
              <button onClick={() => setReviewProduct(null)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 rounded-xl">
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center">
                  <MessageSquarePlus className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-lg">Product Review</h3>
                  <p className="text-xs text-slate-600 font-bold">{reviewProduct.name}</p>
                </div>
              </div>

              {reviewSubmitted ? (
                <div className="p-4 bg-emerald-50 text-emerald-900 rounded-2xl border border-emerald-200 text-center font-black text-xs">
                  Review submitted!
                </div>
              ) : (
                <form onSubmit={handleSaveReview} className="space-y-4">
                  <div>
                    <label className="text-xs font-black text-slate-900 block mb-1.5">Review Notes</label>
                    <textarea
                      value={userComment}
                      onChange={(e) => setUserComment(e.target.value)}
                      placeholder="Share your thoughts on build quality, battery, or thermals..."
                      rows={3}
                      className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm font-bold"
                    />
                  </div>
                  <button type="submit" className="w-full py-3 bg-sky-600 text-white font-black text-sm rounded-xl">
                    Submit Review
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
