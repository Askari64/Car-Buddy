import React, { useState } from "react";
import { X, Scale, ChevronUp, ChevronDown, Trash2 } from "lucide-react";

export default function ComparisonDrawer({ comparedCars, onRemove, onClear }) {
  const [isOpen, setIsOpen] = useState(true);

  if (comparedCars.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-950/90 border-t border-slate-800 backdrop-blur-xl shadow-2xl transition-all duration-300">
      
      {/* Header Bar (Clickable to minimize/expand) */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-6 py-3 cursor-pointer bg-slate-900 border-b border-slate-800 hover:bg-slate-850 transition-colors select-none"
      >
        <div className="flex items-center gap-3">
          <Scale className="h-4 w-4 text-indigo-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Comparing {comparedCars.length} of 3 Vehicles
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onClear();
            }}
            className="text-[10px] text-slate-400 hover:text-white hover:underline uppercase font-bold"
          >
            Clear All
          </button>
          
          <button className="text-slate-400 hover:text-white">
            {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Comparison Matrix Content */}
      {isOpen && (
        <div className="mx-auto max-w-7xl px-6 py-6 overflow-x-auto max-h-[40vh] md:max-h-[50vh]">
          
          <div className="min-w-[600px]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr>
                  <th className="w-1/4 pb-4 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Specifications</th>
                  {comparedCars.map((car) => (
                    <th key={car.id} className="pb-4 px-4 font-bold text-white relative">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-sm font-black text-white">{car.make} {car.model}</div>
                          <div className="text-[10px] text-slate-400 font-semibold">{car.variant} • {car.year}</div>
                        </div>
                        <button
                          onClick={() => onRemove(car.id)}
                          className="rounded-lg p-1 text-slate-500 hover:text-rose-400 hover:bg-slate-900 transition-colors"
                          title="Remove from comparison"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </th>
                  ))}
                  {/* Fill empty slots up to 3 */}
                  {Array.from({ length: Math.max(0, 3 - comparedCars.length) }).map((_, i) => (
                    <th key={`empty-th-${i}`} className="pb-4 px-4 text-slate-600 border-dashed border border-slate-800 rounded-xl text-center text-[10px] italic">
                      Add a car to compare
                    </th>
                  ))}
                </tr>
              </thead>
              
              <tbody className="divide-y divide-slate-850">
                {/* Price */}
                <tr>
                  <td className="py-3 font-semibold text-slate-400">Starting MSRP</td>
                  {comparedCars.map((car) => (
                    <td key={`price-${car.id}`} className="py-3 px-4 font-black text-white text-sm">
                      ${car.price.toLocaleString()}
                    </td>
                  ))}
                  {Array.from({ length: 3 - comparedCars.length }).map((_, i) => (
                    <td key={`empty-price-${i}`} className="py-3 px-4 text-slate-700">-</td>
                  ))}
                </tr>

                {/* Category */}
                <tr>
                  <td className="py-3 font-semibold text-slate-400">Body Style</td>
                  {comparedCars.map((car) => (
                    <td key={`cat-${car.id}`} className="py-3 px-4 text-slate-300 font-medium">
                      {car.category}
                    </td>
                  ))}
                  {Array.from({ length: 3 - comparedCars.length }).map((_, i) => (
                    <td key={`empty-cat-${i}`} className="py-3 px-4 text-slate-700">-</td>
                  ))}
                </tr>

                {/* Fuel Type */}
                <tr>
                  <td className="py-3 font-semibold text-slate-400">Fuel System</td>
                  {comparedCars.map((car) => (
                    <td key={`fuel-${car.id}`} className="py-3 px-4 text-slate-300 font-medium">
                      {car.fuelType}
                    </td>
                  ))}
                  {Array.from({ length: 3 - comparedCars.length }).map((_, i) => (
                    <td key={`empty-fuel-${i}`} className="py-3 px-4 text-slate-700">-</td>
                  ))}
                </tr>

                {/* Mileage */}
                <tr>
                  <td className="py-3 font-semibold text-slate-400">Fuel Efficiency</td>
                  {comparedCars.map((car) => (
                    <td key={`mileage-${car.id}`} className="py-3 px-4 text-slate-300 font-semibold">
                      {car.mileage} {car.fuelType === "Electric" ? "MPGe" : "mpg"}
                    </td>
                  ))}
                  {Array.from({ length: 3 - comparedCars.length }).map((_, i) => (
                    <td key={`empty-mil-${i}`} className="py-3 px-4 text-slate-700">-</td>
                  ))}
                </tr>

                {/* Safety Rating */}
                <tr>
                  <td className="py-3 font-semibold text-slate-400">Safety Rating</td>
                  {comparedCars.map((car) => (
                    <td key={`safety-${car.id}`} className="py-3 px-4 text-emerald-400 font-bold">
                      ★ {car.safetyRating} / 5.0
                    </td>
                  ))}
                  {Array.from({ length: 3 - comparedCars.length }).map((_, i) => (
                    <td key={`empty-safe-${i}`} className="py-3 px-4 text-slate-700">-</td>
                  ))}
                </tr>

                {/* Engine */}
                <tr>
                  <td className="py-3 font-semibold text-slate-400">Engine / Motor</td>
                  {comparedCars.map((car) => (
                    <td key={`engine-${car.id}`} className="py-3 px-4 text-slate-300 truncate max-w-[200px]">
                      {car.engine}
                    </td>
                  ))}
                  {Array.from({ length: 3 - comparedCars.length }).map((_, i) => (
                    <td key={`empty-eng-${i}`} className="py-3 px-4 text-slate-700">-</td>
                  ))}
                </tr>

                {/* Horsepower & Torque */}
                <tr>
                  <td className="py-3 font-semibold text-slate-400">Power Output</td>
                  {comparedCars.map((car) => (
                    <td key={`power-${car.id}`} className="py-3 px-4 text-slate-300">
                      {car.horsepower} HP {car.torque ? `/ ${car.torque} lb-ft` : ""}
                    </td>
                  ))}
                  {Array.from({ length: 3 - comparedCars.length }).map((_, i) => (
                    <td key={`empty-pow-${i}`} className="py-3 px-4 text-slate-700">-</td>
                  ))}
                </tr>

                {/* Seats */}
                <tr>
                  <td className="py-3 font-semibold text-slate-400">Seating Capacity</td>
                  {comparedCars.map((car) => (
                    <td key={`seats-${car.id}`} className="py-3 px-4 text-slate-300">
                      {car.seats} Passengers
                    </td>
                  ))}
                  {Array.from({ length: 3 - comparedCars.length }).map((_, i) => (
                    <td key={`empty-seats-${i}`} className="py-3 px-4 text-slate-700">-</td>
                  ))}
                </tr>

                {/* Key Features */}
                <tr>
                  <td className="py-3 font-semibold text-slate-400">Highlight Features</td>
                  {comparedCars.map((car) => (
                    <td key={`feats-${car.id}`} className="py-3 px-4 text-slate-300">
                      <div className="flex flex-wrap gap-1 max-w-[240px]">
                        {car.features.slice(0, 3).map((feat, idx) => (
                          <span key={idx} className="bg-slate-900 px-1.5 py-0.5 rounded text-[10px] text-slate-400 border border-slate-850 truncate max-w-[120px]">
                            {feat}
                          </span>
                        ))}
                        {car.features.length > 3 && (
                          <span className="text-[10px] text-slate-500 font-bold">+{car.features.length - 3} more</span>
                        )}
                      </div>
                    </td>
                  ))}
                  {Array.from({ length: 3 - comparedCars.length }).map((_, i) => (
                    <td key={`empty-feats-${i}`} className="py-3 px-4 text-slate-700">-</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      )}

    </div>
  );
}
