import React from "react";
import { Eye, Scale, Star, Zap } from "lucide-react";

export default function CarCard({ car, onOpenDetails, onToggleCompare, isCompared }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/20 backdrop-blur-xl hover:border-slate-700 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-300 flex flex-col h-full">
      {/* Image container */}
      <div className="relative h-44 w-full bg-slate-950 overflow-hidden border-b border-slate-850 flex-shrink-0">
        {car.imageUrl ? (
          <img
            src={car.imageUrl}
            alt={`${car.make} ${car.model}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-600 bg-slate-900">No Image</div>
        )}
        
        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-slate-300 font-bold uppercase tracking-wider border border-white/5">
          {car.category}
        </span>

        {/* Price Tag */}
        <span className="absolute bottom-3 right-3 bg-blue-600 px-2.5 py-1 rounded-lg text-xs font-black text-white shadow-lg">
          ${car.price.toLocaleString()}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                {car.make} {car.model}
              </h4>
              <p className="text-xs text-slate-400 font-medium">{car.variant} • {car.year}</p>
            </div>
            
            {/* Safety Rating */}
            <div className="flex items-center gap-1 bg-slate-950/40 px-2 py-0.5 rounded border border-slate-800 text-[10px] text-emerald-400 font-bold">
              <Star className="h-3 w-3 fill-emerald-400 text-emerald-400" />
              <span>{car.safetyRating}</span>
            </div>
          </div>

          {/* Quick Specifications */}
          <div className="grid grid-cols-2 gap-2 mt-4 text-[11px] text-slate-400">
            <div className="px-2 py-1 rounded bg-slate-950/30 border border-slate-850/50">
              <span className="text-slate-500 block text-[9px] uppercase font-semibold">Engine / Drivetrain</span>
              <span className="font-semibold text-slate-300 truncate block">{car.fuelType} ({car.transmission})</span>
            </div>
            <div className="px-2 py-1 rounded bg-slate-950/30 border border-slate-850/50">
              <span className="text-slate-500 block text-[9px] uppercase font-semibold">Efficiency</span>
              <span className="font-semibold text-slate-300 truncate block">
                {car.mileage} {car.fuelType === "Electric" ? "MPGe" : "mpg"}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-5 pt-3 border-t border-slate-850">
          <button
            onClick={() => onOpenDetails(car.id)}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950/30 hover:bg-slate-850 py-2 text-xs font-semibold text-slate-300 hover:text-white transition-all"
          >
            <Eye className="h-3.5 w-3.5" />
            Specs
          </button>
          
          <button
            onClick={() => onToggleCompare(car)}
            className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition-all ${
              isCompared
                ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-600/10"
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
}
