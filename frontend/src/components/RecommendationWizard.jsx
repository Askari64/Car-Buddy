import React, { useState } from "react";
import { 
  Sparkles, ArrowRight, ArrowLeft, RotateCcw, 
  Check, Shield, Zap, Flame, Compass, Users, 
  Eye, Scale, Landmark
} from "lucide-react";

export default function RecommendationWizard({ onOpenDetails, onToggleCompare, comparedCars }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  
  // Quiz Preferences State
  const [preferences, setPreferences] = useState({
    budget: 60000,
    useCase: "Commuting",
    category: "any",
    fuelType: "any",
    transmission: "any",
    seats: 5,
  });

  const useCases = [
    { id: "Commuting", title: "Daily Commute", desc: "Prioritize outstanding fuel economy & ease of driving", icon: Zap, color: "text-amber-400 border-amber-500/30 bg-amber-500/5" },
    { id: "Family", title: "Family & Safety", desc: "Prioritize top-tier safety ratings and spacious seating", icon: Users, color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/5" },
    { id: "Performance", title: "Speed & Performance", desc: "Prioritize thrilling horsepower & sporty handling", icon: Flame, color: "text-rose-400 border-rose-500/30 bg-rose-500/5" },
    { id: "Off-road", title: "Adventure & Off-road", desc: "Prioritize raw torque, all-wheel drive & utility", icon: Compass, color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/5" },
  ];

  const categories = [
    { id: "any", title: "Any Style" },
    { id: "SUV", title: "SUV / Crossover" },
    { id: "Sedan", title: "Sedan" },
    { id: "Hatchback", title: "Hatchback" },
    { id: "Truck", title: "Pickup Truck" },
    { id: "Coupe", title: "Coupe / Sport" },
  ];

  const fuelTypes = [
    { id: "any", title: "Any Fuel" },
    { id: "Hybrid", title: "Hybrid (ECO)" },
    { id: "Electric", title: "Fully Electric" },
    { id: "Gasoline", title: "Gasoline" },
  ];

  const transmissions = [
    { id: "any", title: "No Preference" },
    { id: "Automatic", title: "Automatic" },
    { id: "Manual", title: "Manual / Stick" },
  ];

  const handleNext = () => setStep((s) => Math.min(s + 1, 5));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));
  
  const resetQuiz = () => {
    setStep(1);
    setResults([]);
    setPreferences({
      budget: 60000,
      useCase: "Commuting",
      category: "any",
      fuelType: "any",
      transmission: "any",
      seats: 5,
    });
  };

  const getResults = async () => {
    setLoading(true);
    setStep(5); // Move to results step
    try {
      const response = await fetch("http://localhost:5000/api/cars/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(preferences),
      });
      const data = await response.json();
      
      // Simulate artificial delay for analyzing animation effect
      setTimeout(() => {
        setResults(data);
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Error matching cars:", error);
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Header */}
      {step < 5 && (
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20 mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            AI Recommendations
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Find Your Ideal Drive
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-400">
            Tell us about your lifestyle, and our matching algorithm will comb through the specifications to find the perfect car for you.
          </p>

          {/* Progress Bar */}
          <div className="mx-auto mt-8 max-w-md bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800">
            <div 
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full transition-all duration-500 ease-out"
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            ></div>
          </div>
          <div className="mt-2 text-xs text-slate-500">Step {step} of 4</div>
        </div>
      )}

      {/* STEP 1: Budget */}
      {step === 1 && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 md:p-8 backdrop-blur-xl animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
              <Landmark className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">What is your maximum budget?</h3>
              <p className="text-xs text-slate-400">We will find matches within this price range.</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <span className="text-4xl font-extrabold text-white">
              ${preferences.budget.toLocaleString()}
            </span>
          </div>

          <input
            type="range"
            min="25000"
            max="150000"
            step="2500"
            value={preferences.budget}
            onChange={(e) => setPreferences({ ...preferences, budget: parseInt(e.target.value) })}
            className="mt-6 w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-2 font-medium">
            <span>$25,000</span>
            <span>$85,000</span>
            <span>$150,000+</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
            {[35000, 50000, 75000, 130000].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setPreferences({ ...preferences, budget: preset })}
                className={`py-2 px-3 text-xs rounded-xl border font-semibold transition-all ${
                  preferences.budget === preset
                    ? "bg-blue-600 border-blue-500 text-white"
                    : "border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700"
                }`}
              >
                ${preset.toLocaleString()} Limit
              </button>
            ))}
          </div>

          <div className="flex justify-end mt-10">
            <button
              onClick={handleNext}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs font-bold text-white hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/10"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Use Case */}
      {step === 2 && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 md:p-8 backdrop-blur-xl animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">How will you primarily use the car?</h3>
              <p className="text-xs text-slate-400">This prioritizes features like fuel economy, power, safety, or utility.</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 mt-6">
            {useCases.map((uc) => {
              const Icon = uc.icon;
              const isSelected = preferences.useCase === uc.id;
              return (
                <button
                  key={uc.id}
                  onClick={() => setPreferences({ ...preferences, useCase: uc.id })}
                  className={`flex items-start text-left p-4 rounded-2xl border transition-all duration-300 ${
                    isSelected
                      ? "border-indigo-500 bg-indigo-500/5 text-white shadow-lg shadow-indigo-500/5"
                      : "border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700 hover:bg-slate-950/60"
                  }`}
                >
                  <div className={`mr-4 rounded-xl border p-2.5 ${isSelected ? uc.color : "border-slate-800 bg-slate-900"}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className={`font-bold text-sm ${isSelected ? "text-white" : "text-slate-200"}`}>{uc.title}</h4>
                    <p className="text-xs mt-1 text-slate-400 leading-relaxed">{uc.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-between mt-10">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 rounded-xl border border-slate-800 px-5 py-3 text-xs font-bold text-slate-400 hover:text-white hover:border-slate-700 transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs font-bold text-white hover:bg-blue-500 transition-all"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Body Style */}
      {step === 3 && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 md:p-8 backdrop-blur-xl animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Do you have a preferred body style?</h3>
              <p className="text-xs text-slate-400">Select standard vehicle designs or keep options open.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
            {categories.map((cat) => {
              const isSelected = preferences.category === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setPreferences({ ...preferences, category: cat.id })}
                  className={`py-4 px-4 rounded-xl border font-bold text-xs flex flex-col items-center justify-center transition-all ${
                    isSelected
                      ? "bg-gradient-to-tr from-blue-600 to-indigo-600 border-blue-500 text-white shadow-lg shadow-indigo-600/10"
                      : "border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700 hover:bg-slate-950/60"
                  }`}
                >
                  <span className="text-sm font-bold">{cat.title}</span>
                </button>
              );
            })}
          </div>

          {/* Seats choice integrated in step 3 */}
          <div className="mt-8 pt-6 border-t border-slate-800">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Minimum seats needed</h4>
            <div className="flex gap-2">
              {[4, 5].map((s) => {
                const isSelected = preferences.seats === s;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setPreferences({ ...preferences, seats: s })}
                    className={`h-11 w-14 rounded-xl border text-xs font-bold transition-all ${
                      isSelected
                        ? "bg-blue-600 border-blue-500 text-white"
                        : "border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    {s} Seats
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between mt-10">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 rounded-xl border border-slate-800 px-5 py-3 text-xs font-bold text-slate-400 hover:text-white hover:border-slate-700 transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs font-bold text-white hover:bg-blue-500 transition-all"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Fuel & Transmission */}
      {step === 4 && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 md:p-8 backdrop-blur-xl animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Fuel & Transmission Preferences</h3>
              <p className="text-xs text-slate-400">Specify drivetrain configurations or select any option.</p>
            </div>
          </div>

          <div className="space-y-6 mt-6">
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Fuel Efficiency / Drive type</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {fuelTypes.map((ft) => {
                  const isSelected = preferences.fuelType === ft.id;
                  return (
                    <button
                      key={ft.id}
                      onClick={() => setPreferences({ ...preferences, fuelType: ft.id })}
                      className={`py-3 px-2 rounded-xl border text-xs font-bold transition-all ${
                        isSelected
                          ? "bg-blue-600 border-blue-500 text-white"
                          : "border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      {ft.title}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Transmission</h4>
              <div className="grid grid-cols-3 gap-3">
                {transmissions.map((tr) => {
                  const isSelected = preferences.transmission === tr.id;
                  return (
                    <button
                      key={tr.id}
                      onClick={() => setPreferences({ ...preferences, transmission: tr.id })}
                      className={`py-3 px-2 rounded-xl border text-xs font-bold transition-all ${
                        isSelected
                          ? "bg-blue-600 border-blue-500 text-white"
                          : "border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      {tr.title}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-10">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 rounded-xl border border-slate-800 px-5 py-3 text-xs font-bold text-slate-400 hover:text-white hover:border-slate-700 transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <button
              onClick={getResults}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-xs font-bold text-white hover:opacity-90 transition-all shadow-lg shadow-indigo-600/20"
            >
              <Sparkles className="h-4 w-4" />
              Generate Matches
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: Results / Loading */}
      {step === 5 && (
        <div className="space-y-8 animate-fade-in">
          {loading ? (
            /* Loading State */
            <div className="flex flex-col items-center justify-center py-20 rounded-2xl border border-slate-800 bg-slate-900/30 backdrop-blur-xl">
              <div className="relative h-16 w-16">
                <div className="absolute inset-0 rounded-full border-4 border-slate-800"></div>
                <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
              </div>
              <h3 className="mt-6 text-lg font-bold text-white">Analyzing Specifications...</h3>
              <div className="mt-3 space-y-1.5 text-center text-xs text-slate-400 max-w-xs px-4">
                <p className="animate-pulse">Matching engine configurations...</p>
                <p className="text-slate-500">Cross-referencing safety ratings & space...</p>
              </div>
            </div>
          ) : (
            /* Results State */
            <div>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                <div>
                  <h3 className="text-2xl font-extrabold text-white">Your Best Matches</h3>
                  <p className="text-xs text-slate-400 mt-1">We found {results.length} cars that perfectly fit your lifestyle.</p>
                </div>
                <button
                  onClick={resetQuiz}
                  className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Retake Quiz
                </button>
              </div>

              {results.length === 0 ? (
                <div className="text-center py-16 border border-slate-800 rounded-2xl bg-slate-900/30">
                  <p className="text-slate-400">No cars found matching your strict criteria.</p>
                  <p className="text-xs text-slate-500 mt-1">Try raising your budget limit or broadening your fuel preferences.</p>
                  <button
                    onClick={resetQuiz}
                    className="mt-5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-500"
                  >
                    Adjust Filters
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  {results.map((car, index) => {
                    const isCompared = comparedCars.some((c) => c.id === car.id);
                    return (
                      <div 
                        key={car.id}
                        className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/30 p-5 md:p-6 backdrop-blur-xl flex flex-col md:flex-row gap-6 hover:border-slate-700 transition-all group"
                      >
                        {/* Recommendation Rank Badge */}
                        <div className="absolute top-4 left-4 z-10 flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white shadow-md">
                          #{index + 1}
                        </div>

                        {/* Image */}
                        <div className="w-full md:w-56 h-36 rounded-xl overflow-hidden bg-slate-950 flex-shrink-0 relative border border-slate-850">
                          {car.imageUrl ? (
                            <img 
                              src={car.imageUrl} 
                              alt={`${car.make} ${car.model}`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-600 bg-slate-900">No Image</div>
                          )}
                          <div className="absolute bottom-2 right-2 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-slate-300 font-semibold uppercase">
                            {car.category}
                          </div>
                        </div>

                        {/* Mid Section: Details & Score */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                                  {car.make} {car.model}
                                </h4>
                                <p className="text-xs text-slate-400 font-medium">{car.variant} • {car.year}</p>
                              </div>
                              
                              {/* Match Percentage */}
                              <div className="text-right flex-shrink-0">
                                <div className="text-xs font-bold text-indigo-400 tracking-wide uppercase">Match Score</div>
                                <div className="text-2xl font-black bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                                  {car.matchScore}%
                                </div>
                              </div>
                            </div>

                            {/* Bullet Reasons */}
                            <div className="mt-4 space-y-1.5">
                              {car.matchReasons?.map((reason, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                                  <div className="h-4 w-4 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
                                    <Check className="h-2.5 w-2.5" />
                                  </div>
                                  <span>{reason}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Quick Specs Grid */}
                          <div className="grid grid-cols-3 gap-2 mt-4 py-2.5 px-3 rounded-lg bg-slate-950/40 border border-slate-850/50 text-[11px] text-slate-400">
                            <div>
                              <span className="text-slate-500 block">Fuel Type</span>
                              <span className="font-semibold text-slate-300">{car.fuelType}</span>
                            </div>
                            <div>
                              <span className="text-slate-500 block">Efficiency</span>
                              <span className="font-semibold text-slate-300">{car.mileage} {car.fuelType === "Electric" ? "MPGe" : "mpg"}</span>
                            </div>
                            <div>
                              <span className="text-slate-500 block">Safety</span>
                              <span className="font-semibold text-emerald-400">★ {car.safetyRating}</span>
                            </div>
                          </div>
                        </div>

                        {/* Right Section: Pricing & Actions */}
                        <div className="w-full md:w-36 flex md:flex-col justify-between items-center md:items-end md:justify-end gap-3 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-slate-800 md:pl-6">
                          <div className="text-left md:text-right">
                            <span className="text-[10px] text-slate-500 block font-bold uppercase tracking-wider">MSRP Starting</span>
                            <span className="text-xl font-extrabold text-white">${car.price.toLocaleString()}</span>
                          </div>
                          
                          <div className="flex md:flex-col gap-2 w-full max-w-[200px] md:max-w-none">
                            <button
                              onClick={() => onOpenDetails(car.id)}
                              className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-850 py-2 text-xs font-semibold text-slate-300 hover:text-white transition-all"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              View Details
                            </button>
                            <button
                              onClick={() => onToggleCompare(car)}
                              className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition-all ${
                                isCompared
                                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                                  : "border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850"
                              }`}
                            >
                              <Scale className="h-3.5 w-3.5" />
                              {isCompared ? "Compared" : "Compare"}
                            </button>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
