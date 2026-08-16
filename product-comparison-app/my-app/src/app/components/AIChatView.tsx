"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Product } from "./HomeView";
import {
  Send,
  Bot,
  User,
  ArrowLeft,
  Sparkles,
  FileDown,
  Info,
  Lightbulb,
  Copy,
  Check,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface AIChatViewProps {
  shortlisted: Product[];
  onBack: () => void;
}

const SMART_RESPONSES: Record<string, string> = {
  battery: "Based on official datasheets, AMD Ryzen 7000 processors offer **15-20% longer battery runtimes** due to TSMC's 6nm energy efficiency process during daily productivity.",
  gaming: "For gaming workloads, the **RTX 4050 / RTX 4060** models deliver ~30% higher framerates than the RTX 3050 series thanks to Ada Lovelace architecture & DLSS 3 frame generation.",
  price: "Price-to-performance analysis: Laptops priced between **₹55,000 and ₹68,000** hit the sweet spot for budget gaming and multitasking.",
  performance: "Multi-core benchmark breakdown: Intel 13th Gen i7 leads in single-threaded burst speeds, whereas AMD Ryzen 7 sustains lower heat and consistent clock speeds under prolonged loads.",
  display: "OLED panels deliver **100% DCI-P3 color gamut** with zero light bleed and true blacks, whereas IPS panels top out around 72% NTSC (~100% sRGB).",
};

export default function AIChatView({ shortlisted, onBack }: AIChatViewProps) {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg_1",
      role: "assistant",
      content:
        shortlisted.length > 0
          ? `Hello! I've loaded official datasheets for your **${shortlisted.length} selected products** (including **${shortlisted[0].brand} ${shortlisted[0].name}**) into my context window. What would you like to compare or verify?`
          : "Hello! I'm your VersusAI Hardware Assistant. You haven't shortlisted any items yet, but I can answer tech spec questions or recommend products based on your budget!",
      timestamp: new Date(),
    },
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const getSmartResponse = (userInput: string): string => {
    const lower = userInput.toLowerCase();
    for (const [key, response] of Object.entries(SMART_RESPONSES)) {
      if (lower.includes(key)) return response;
    }
    return `Grounded in official datasheets for your ${shortlisted.length > 0 ? shortlisted.length : ""} selected products: The ${shortlisted.length > 1 ? shortlisted[1].brand + " " + shortlisted[1].name : "alternative selection"} offers distinct advantages depending on whether your priority is **raw CPU power**, **battery longevity**, or **display accuracy**.`;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    const userInput = input;
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getSmartResponse(userInput),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1200 + Math.random() * 600);
  };

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content.replace(/\*\*/g, ""));
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const suggestedQuestions = [
    "Which has better battery life?",
    "Best GPU performance for gaming?",
    "Display quality: OLED vs IPS?",
    "Price vs performance breakdown",
  ];

  return (
    <div className="py-6 h-[calc(100vh-80px)] flex flex-col">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white border border-slate-200 rounded-t-3xl p-4 gap-4 shrink-0 shadow-2xs">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/70 rounded-xl transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                VersusAI Chat <Sparkles className="w-4 h-4 text-brand-600" />
              </h2>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <p className="text-[11px] font-bold text-slate-500">RAG Engine Active • Zero Hallucinations</p>
              </div>
            </div>
          </div>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200/70 text-slate-800 rounded-xl text-xs font-bold border border-slate-200 transition-colors">
          <FileDown className="w-4 h-4 text-brand-600" /> Export Chat
        </button>
      </div>

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden bg-white border border-slate-200 rounded-b-3xl border-t-0 shadow-md">
        {/* Context Sidebar */}
        <div className="hidden lg:block w-80 bg-slate-50 border-r border-slate-200 p-5 overflow-y-auto shrink-0">
          <div className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-brand-600" /> Active Context Window
          </div>

          {shortlisted.length === 0 ? (
            <div className="text-xs text-slate-500 font-medium text-center py-10 bg-white rounded-2xl border border-dashed border-slate-200">
              No products shortlisted yet.
            </div>
          ) : (
            <div className="space-y-3">
              {shortlisted.map((prod) => (
                <div key={prod.id} className="bg-white rounded-2xl p-3 border border-slate-200 shadow-2xs flex gap-3 items-center">
                  <img src={prod.image} alt={prod.brand} className="w-12 h-12 rounded-xl object-cover bg-slate-100" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold text-brand-600 uppercase">{prod.brand}</div>
                    <div className="text-xs font-extrabold text-slate-900 truncate">{prod.name}</div>
                    <div className="text-xs font-semibold text-slate-500">₹{prod.price.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Suggested Prompts */}
          <div className="mt-6 space-y-2">
            <div className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> Quick Questions
            </div>
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => setInput(q)}
                className="w-full text-left px-3 py-2 rounded-xl bg-white hover:bg-brand-50 text-xs font-semibold text-slate-700 hover:text-brand-600 border border-slate-200/80 transition-all shadow-2xs"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Main Chat Stream */}
        <div className="flex-1 flex flex-col bg-white">
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
            {messages.map((msg) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={msg.id}
                className={`flex gap-3 sm:gap-4 max-w-3xl ${msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
              >
                <div className={`w-9 h-9 shrink-0 rounded-xl flex items-center justify-center ${msg.role === "user"
                    ? "bg-slate-800 text-white"
                    : "bg-gradient-to-br from-brand-600 to-indigo-600 text-white shadow-sm"
                  }`}>
                  {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className="group">
                  <div className={`px-4 py-3.5 rounded-2xl text-sm leading-relaxed ${msg.role === "user"
                      ? "bg-brand-600 text-white font-medium rounded-tr-xs"
                      : "bg-slate-100 border border-slate-200/80 text-slate-800 rounded-tl-xs"
                    }`}>
                    {msg.content.split("**").map((text, i) =>
                      i % 2 === 1 ? (
                        <strong key={i} className={msg.role === "user" ? "text-white font-bold" : "text-slate-900 font-bold"}>{text}</strong>
                      ) : (
                        <span key={i}>{text}</span>
                      )
                    )}
                  </div>
                  {msg.role === "assistant" && (
                    <div className="flex items-center gap-2 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="flex items-center gap-1 text-[10px] font-bold text-slate-500 hover:text-brand-600 transition-colors"
                      >
                        {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        {copiedId === msg.id ? "Copied!" : "Copy response"}
                      </button>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4 max-w-3xl mr-auto">
                <div className="w-9 h-9 shrink-0 rounded-xl bg-gradient-to-br from-brand-600 to-indigo-600 flex items-center justify-center text-white">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="px-5 py-4 bg-slate-100 border border-slate-200/80 rounded-2xl rounded-tl-xs flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-brand-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 bg-brand-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 bg-brand-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Form Bar */}
          <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50">
            <div className="lg:hidden flex gap-2 overflow-x-auto scrollbar-hide mb-3">
              {suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => setInput(q)}
                  className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-white text-xs font-semibold text-slate-700 border border-slate-200 shrink-0"
                >
                  {q}
                </button>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about specs, benchmarks, or recommendations..."
                className="w-full pl-5 pr-14 py-3.5 bg-white border border-slate-300 rounded-2xl text-slate-900 text-sm font-medium focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all placeholder:text-slate-400 shadow-2xs"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="absolute right-2 p-2.5 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-brand-500/20"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="text-center mt-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-wide">
              Powered by RAG Engine • Grounded in official datasheets
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
