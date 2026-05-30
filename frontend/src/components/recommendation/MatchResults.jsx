import { useState } from "react";
import { Check, Eye, RotateCcw, Scale, Star } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

function LoadingState() {
  return (
    <Card className="flex min-h-0 flex-1 flex-col items-center justify-center border-slate-800 bg-slate-900/30 text-center text-slate-100 shadow-none backdrop-blur-xl">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 rounded-full border-4 border-slate-800" />
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
      <h3 className="mt-6 text-lg font-bold text-white">Analyzing specifications...</h3>
      <p className="mt-3 max-w-xs px-4 text-xs text-slate-400">Matching budget, safety, powertrain, and space requirements.</p>
    </Card>
  );
}

function ResultCard({ car, index, isCompared, onOpenDetails, onToggleCompare }) {
  const [imageError, setImageError] = useState(false);
  const reasons = car.matchReasons?.slice(0, 3) ?? [];

  return (
    <Card className="group relative grid w-full shrink-0 gap-4 overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/35 p-4 text-slate-100 shadow-lg transition-all duration-300 hover:border-slate-700/80 hover:bg-slate-900/50 hover:shadow-indigo-500/5 md:grid-cols-[14rem_1fr_12rem] sm:p-5">
      <div className="absolute left-3 top-3 z-10 flex items-center justify-center gap-1 rounded-full bg-linear-to-r from-blue-600 to-indigo-600 px-2.5 py-1 text-[11px] font-black text-white shadow-lg shadow-blue-500/20 backdrop-blur-md">
        <span>#{index + 1} Match</span>
      </div>
      <div className="relative w-full aspect-16/10 overflow-hidden rounded-lg border border-slate-800 bg-slate-950 md:aspect-auto md:h-36">
        {car.imageUrl && !imageError ? (
          <img
            src={car.imageUrl}
            alt={`${car.make} ${car.model}`}
            onError={() => setImageError(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-900 text-slate-600">No Image</div>
        )}
        <span className="absolute bottom-2.5 right-2.5 rounded border border-white/5 bg-slate-900/80 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-slate-300 backdrop-blur-md">
          {car.category}
        </span>
      </div>

      <div className="flex flex-col justify-between gap-3 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h4 className="truncate text-lg font-bold text-white transition-colors duration-200 group-hover:text-blue-400">
              {car.make} {car.model}
            </h4>
            <p className="truncate text-xs font-semibold text-slate-400">
              {car.variant} <span className="text-slate-600">•</span> {car.year}
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 shadow-inner">
            <span className="text-[10px] font-black uppercase tracking-wider text-indigo-400">Match</span>
            <span className="bg-linear-to-r from-blue-300 to-indigo-300 bg-clip-text text-xl font-black leading-none text-transparent">
              {car.matchScore}%
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {reasons.map((reason) => (
            <div key={reason} className="flex items-center gap-1.5 rounded-full border border-emerald-500/10 bg-emerald-500/5 px-2.5 py-1 text-[11px] text-slate-300 shadow-xs">
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                <Check className="h-3 w-3" />
              </span>
              <span>{reason}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 text-xs text-slate-400">
          <span className="rounded-md border border-slate-800/80 bg-slate-950/30 px-2.5 py-1 font-medium">
            {car.fuelType}
          </span>
          <span className="rounded-md border border-slate-800/80 bg-slate-950/30 px-2.5 py-1 font-medium">
            {car.transmission}
          </span>
          <span className="rounded-md border border-slate-800/80 bg-slate-950/30 px-2.5 py-1 font-medium">
            {car.mileage} {car.fuelType === "Electric" ? "MPGe" : "mpg"}
          </span>
          <span className="rounded-md border border-slate-800/80 bg-slate-950/30 px-2.5 py-1 font-medium">
            {car.horsepower} HP
          </span>
          <span className="rounded-md border border-slate-800/80 bg-slate-950/30 px-2.5 py-1 font-medium">
            {car.seats} Seats
          </span>
          <span className="flex items-center gap-1 rounded-md border border-emerald-500/10 bg-emerald-500/5 px-2.5 py-1 font-semibold text-emerald-400">
            <Star className="h-3.5 w-3.5 fill-emerald-400 text-emerald-400" />
            <span>{car.safetyRating} Safety</span>
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-3 border-t border-slate-800/60 pt-3 md:border-t-0 md:border-l md:pl-4 md:pt-0 md:justify-center md:gap-4 md:items-center">
        <div className="text-left md:text-center w-full">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">MSRP Starting</span>
          <span className="text-2xl font-black text-white">${car.price.toLocaleString()}</span>
        </div>
        <div className="flex w-full gap-2 md:flex-col">
          <Button variant="subtle" size="sm" className="h-8 flex-1 justify-center gap-1.5 text-xs font-semibold" onClick={() => onOpenDetails(car.id)}>
            <Eye className="h-3.5 w-3.5" />
            Specs
          </Button>
          <Button variant={isCompared ? "gradient" : "subtle"} size="sm" className="h-8 flex-1 justify-center gap-1.5 text-xs font-semibold" onClick={() => onToggleCompare(car)}>
            <Scale className="h-3.5 w-3.5" />
            {isCompared ? "Compared" : "Compare"}
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default function MatchResults({ loading, results, comparedCars, onReset, onOpenDetails, onToggleCompare }) {
  if (loading) return <LoadingState />;

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col">
      <div className="mb-3 flex shrink-0 flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-2xl font-extrabold tracking-tight text-white">Your Best Matches</h3>
          <p className="text-sm text-slate-400">We found {results.length} cars that fit your preferences.</p>
        </div>
        <Button variant="subtle" onClick={onReset}>
          <RotateCcw />
          Retake Quiz
        </Button>
      </div>

      {results.length === 0 ? (
        <Card className="flex min-h-72 flex-col items-center justify-center border-slate-800 bg-slate-900/30 p-6 text-center shadow-none">
          <p className="text-slate-400">No cars found matching your strict criteria.</p>
          <p className="mt-1 text-xs text-slate-500">Try raising your budget or broadening your fuel preferences.</p>
          <Button variant="brand" className="mt-5" onClick={onReset}>
            Adjust Filters
          </Button>
        </Card>
      ) : (
        <div className="flex flex-col gap-4 overflow-y-auto no-scrollbar pr-1 pb-4 flex-1 min-h-0">
          {results.map((car, index) => (
            <ResultCard
              key={car.id}
              car={car}
              index={index}
              isCompared={comparedCars.some((compared) => compared.id === car.id)}
              onOpenDetails={onOpenDetails}
              onToggleCompare={onToggleCompare}
            />
          ))}
        </div>
      )}
    </div>
  );
}
