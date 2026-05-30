import { Car, Compass, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

export default function Navbar({ activeTab, setActiveTab }) {
  return (
    <header className="z-40 w-full shrink-0 border-b border-slate-800 bg-slate-950/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-tr from-blue-600 to-indigo-500 shadow-lg shadow-indigo-500/30">
            <Car className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="flex items-center gap-1.5 text-xl font-bold tracking-tight text-white">
              Car <span className="bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Buddy</span>
            </h1>
            <p className="hidden text-[10px] font-medium uppercase tracking-wide text-slate-400 sm:block">Your Intelligent Auto Matcher</p>
          </div>
        </div>

        <nav className="flex space-x-1 rounded-lg border border-slate-800 bg-slate-900/80 p-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab("wizard")}
            className={`h-9 rounded-md px-3 ${
              activeTab === "wizard"
                ? "bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-600/10"
                : "text-slate-400 hover:bg-slate-800/40 hover:text-white"
            }`}
          >
            <Sparkles />
            <span className="hidden sm:inline">Match Quiz</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab("browse")}
            className={`h-9 rounded-md px-3 ${
              activeTab === "browse"
                ? "bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-600/10"
                : "text-slate-400 hover:bg-slate-800/40 hover:text-white"
            }`}
          >
            <Compass />
            <span className="hidden sm:inline">Browse Inventory</span>
          </Button>
        </nav>

        <div className="hidden items-center gap-1 text-xs text-slate-400 md:flex">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Connected
        </div>
      </div>
    </header>
  );
}
