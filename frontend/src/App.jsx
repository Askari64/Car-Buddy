import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import RecommendationWizard from "./components/RecommendationWizard.jsx";
import CarCard from "./components/CarCard.jsx";
import CarDetailsModal from "./components/CarDetailsModal.jsx";
import ComparisonDrawer from "./components/ComparisonDrawer.jsx";
import { Search, RotateCcw, SlidersHorizontal } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("wizard"); // "wizard" or "browse"
  const [comparedCars, setComparedCars] = useState([]);
  const [activeCarId, setActiveCarId] = useState(null);

  // Browse Inventory State
  const [cars, setCars] = useState([]);
  const [makes, setMakes] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Filters State
  const [search, setSearch] = useState("");
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFuel, setSelectedFuel] = useState("");
  const [selectedTransmission, setSelectedTransmission] = useState("");
  const [selectedSafety, setSelectedSafety] = useState("");
  const [sortBy, setSortBy] = useState("make-asc");

  // Fetch unique makes on mount
  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/cars/makes");
        const data = await response.json();
        setMakes(data);
      } catch (error) {
        console.error("Error fetching makes:", error);
      }
    };
    fetchMakes();
  }, []);

  // Fetch cars reactively when filters change
  useEffect(() => {
    if (activeTab !== "browse") return;

    const fetchCars = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (search) params.append("q", search);
        if (selectedMake) params.append("make", selectedMake);
        if (selectedCategory) params.append("category", selectedCategory);
        if (selectedFuel) params.append("fuelType", selectedFuel);
        if (selectedTransmission) params.append("transmission", selectedTransmission);
        if (selectedSafety) params.append("minSafetyRating", selectedSafety);
        if (sortBy) params.append("sortBy", sortBy);

        const response = await fetch(`http://localhost:5000/api/cars?${params.toString()}`);
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search input slightly to avoid excessive backend hits
    const delayDebounce = setTimeout(() => {
      fetchCars();
    }, 250);

    return () => clearTimeout(delayDebounce);
  }, [
    activeTab,
    search,
    selectedMake,
    selectedCategory,
    selectedFuel,
    selectedTransmission,
    selectedSafety,
    sortBy,
  ]);

  // Handle comparison tray list
  const handleToggleCompare = (car) => {
    setComparedCars((prev) => {
      const exists = prev.some((c) => c.id === car.id);
      if (exists) {
        return prev.filter((c) => c.id !== car.id);
      }
      if (prev.length >= 3) {
        alert("You can compare up to 3 cars at the same time.");
        return prev;
      }
      return [...prev, car];
    });
  };

  const handleRemoveCompare = (id) => {
    setComparedCars((prev) => prev.filter((c) => c.id !== id));
  };

  const handleClearCompare = () => {
    setComparedCars([]);
  };

  const handleResetFilters = () => {
    setSearch("");
    setSelectedMake("");
    setSelectedCategory("");
    setSelectedFuel("");
    setSelectedTransmission("");
    setSelectedSafety("");
    setSortBy("make-asc");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white flex flex-col relative pb-36">
      
      {/* Decorative Blur Blobs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Header / Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-grow">
        
        {/* Recommendation Wizard Tab */}
        {activeTab === "wizard" && (
          <RecommendationWizard 
            onOpenDetails={setActiveCarId}
            onToggleCompare={handleToggleCompare}
            comparedCars={comparedCars}
          />
        )}

        {/* Browse Inventory Tab */}
        {activeTab === "browse" && (
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
                  Explore Catalog
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Search, filter, and compare our dataset of makes, models, and specifications.
                </p>
              </div>
              
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-2.5 text-xs font-semibold text-slate-400 hover:text-white hover:border-slate-700 transition-all"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset Filters
              </button>
            </div>

            {/* Filter Dashboard */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5 md:p-6 backdrop-blur-xl mb-8 space-y-5">
              
              {/* Row 1: Search & Sort */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                    <Search className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by make, model, variant, or type..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/60 py-3 pl-10 pr-4 text-xs text-slate-200 placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>
                
                <div className="w-full md:w-60 flex-shrink-0">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/60 py-3 px-3 text-xs text-slate-300 focus:border-blue-500 focus:outline-none cursor-pointer"
                  >
                    <option value="make-asc">Make (A to Z)</option>
                    <option value="price-asc">Price (Low to High)</option>
                    <option value="price-desc">Price (High to Low)</option>
                    <option value="mileage-desc">Highest Fuel Economy</option>
                    <option value="safetyRating-desc">Highest Safety Rating</option>
                    <option value="horsepower-desc">Highest Horsepower</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Select Dropdowns */}
              <div className="pt-4 border-t border-slate-850 grid grid-cols-2 md:grid-cols-5 gap-3.5">
                {/* Make */}
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-1.5">Manufacturer</label>
                  <select
                    value={selectedMake}
                    onChange={(e) => setSelectedMake(e.target.value)}
                    className="w-full rounded-lg border border-slate-800 bg-slate-950/60 py-2.5 px-2 text-xs text-slate-300 focus:outline-none"
                  >
                    <option value="">All Makes</option>
                    {makes.map((mk) => (
                      <option key={mk} value={mk}>{mk}</option>
                    ))}
                  </select>
                </div>

                {/* Body style */}
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-1.5">Body Style</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full rounded-lg border border-slate-800 bg-slate-950/60 py-2.5 px-2 text-xs text-slate-300 focus:outline-none"
                  >
                    <option value="">All Styles</option>
                    <option value="SUV">SUV</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Truck">Truck</option>
                    <option value="Coupe">Coupe</option>
                  </select>
                </div>

                {/* Fuel type */}
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-1.5">Fuel Type</label>
                  <select
                    value={selectedFuel}
                    onChange={(e) => setSelectedFuel(e.target.value)}
                    className="w-full rounded-lg border border-slate-800 bg-slate-950/60 py-2.5 px-2 text-xs text-slate-300 focus:outline-none"
                  >
                    <option value="">All Fuels</option>
                    <option value="Gasoline">Gasoline</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Electric">Electric</option>
                  </select>
                </div>

                {/* Transmission */}
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-1.5">Transmission</label>
                  <select
                    value={selectedTransmission}
                    onChange={(e) => setSelectedTransmission(e.target.value)}
                    className="w-full rounded-lg border border-slate-800 bg-slate-950/60 py-2.5 px-2 text-xs text-slate-300 focus:outline-none"
                  >
                    <option value="">All Gears</option>
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>

                {/* Safety Rating */}
                <div className="col-span-2 md:col-span-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-1.5">Min Safety Rating</label>
                  <select
                    value={selectedSafety}
                    onChange={(e) => setSelectedSafety(e.target.value)}
                    className="w-full rounded-lg border border-slate-800 bg-slate-950/60 py-2.5 px-2 text-xs text-slate-300 focus:outline-none"
                  >
                    <option value="">Any Rating</option>
                    <option value="4.0">★ 4.0 & Up</option>
                    <option value="4.5">★ 4.5 & Up</option>
                    <option value="5.0">★ 5.0 Only</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Catalog Grid */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-32">
                <div className="h-10 w-10 rounded-full border-4 border-slate-800 border-t-blue-500 animate-spin"></div>
                <span className="mt-4 text-xs text-slate-400 font-semibold tracking-wide">Searching inventory...</span>
              </div>
            ) : cars.length === 0 ? (
              <div className="text-center py-20 border border-slate-800 rounded-2xl bg-slate-900/10">
                <p className="text-slate-400">No cars match your search query and filters.</p>
                <button
                  onClick={handleResetFilters}
                  className="mt-4 text-xs text-blue-400 font-semibold hover:underline"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map((car) => (
                  <CarCard
                    key={car.id}
                    car={car}
                    onOpenDetails={setActiveCarId}
                    onToggleCompare={handleToggleCompare}
                    isCompared={comparedCars.some((c) => c.id === car.id)}
                  />
                ))}
              </div>
            )}

          </div>
        )}

      </main>

      {/* Bottom Comparison Drawer */}
      <ComparisonDrawer
        comparedCars={comparedCars}
        onRemove={handleRemoveCompare}
        onClear={handleClearCompare}
      />

      {/* Details Specification Modal */}
      <CarDetailsModal
        carId={activeCarId}
        onClose={() => setActiveCarId(null)}
      />

    </div>
  );
}
