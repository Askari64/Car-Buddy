import React from "react";
import { Car, Compass, Sparkles } from "lucide-react";

export default function Navbar({ activeTab, setActiveTab }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Branding */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-lg shadow-indigo-500/30">
            <Car className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
              Car <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Buddy</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">Your Intelligent Auto Matcher</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 rounded-xl bg-slate-900/80 p-1 border border-slate-800">
          <button
            onClick={() => setActiveTab("wizard")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all duration-300 ${
              activeTab === "wizard"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-600/10"
                : "text-slate-400 hover:text-white hover:bg-slate-800/40"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            Match Quiz
          </button>
          
          <button
            onClick={() => setActiveTab("browse")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all duration-300 ${
              activeTab === "browse"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-600/10"
                : "text-slate-400 hover:text-white hover:bg-slate-800/40"
            }`}
          >
            <Compass className="h-3.5 w-3.5" />
            Browse Inventory
          </button>
        </nav>

        {/* Small Tagline */}
        <div className="hidden md:flex items-center gap-1 text-xs text-slate-400">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Connected to Neon Database
        </div>

      </div>
    </header>
  );
}
