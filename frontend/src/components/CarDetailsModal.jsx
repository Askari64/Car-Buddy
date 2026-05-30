import React, { useEffect, useState } from "react";
import { X, Star, Shield, Info, Check, MessageSquare } from "lucide-react";

export default function CarDetailsModal({ carId, onClose }) {
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!carId) return;
    
    const fetchCarDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/cars/${carId}`);
        const data = await response.json();
        setCar(data);
      } catch (error) {
        console.error("Error fetching car details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [carId]);

  if (!carId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      {/* Modal Card */}
      <div className="relative w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-scale-up">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-400" />
            <h3 className="text-lg font-bold text-white">Full Specifications</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Scroll Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 flex-1">
            <div className="h-10 w-10 rounded-full border-4 border-slate-800 border-t-blue-500 animate-spin"></div>
            <span className="mt-4 text-xs text-slate-400">Loading full specs sheet...</span>
          </div>
        ) : !car ? (
          <div className="py-20 text-center flex-1">
            <p className="text-slate-400">Failed to load car details.</p>
          </div>
        ) : (
          <div className="overflow-y-auto flex-1 p-6 space-y-8">
            
            {/* Visual Header */}
            <div className="flex flex-col md:flex-row gap-6 pb-6 border-b border-slate-850">
              <div className="w-full md:w-64 h-40 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex-shrink-0">
                {car.imageUrl ? (
                  <img
                    src={car.imageUrl}
                    alt={`${car.make} ${car.model}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-600 bg-slate-900">No Image</div>
                )}
              </div>
              <div className="flex flex-col justify-between py-1">
                <div>
                  <span className="inline-flex items-center gap-1 bg-blue-500/10 px-2 py-0.5 rounded text-[10px] text-blue-400 font-bold uppercase tracking-wider border border-blue-500/25">
                    {car.category}
                  </span>
                  <h4 className="text-2xl font-black text-white mt-2">
                    {car.make} {car.model}
                  </h4>
                  <p className="text-sm text-slate-400 font-semibold mt-1">{car.variant} • {car.year}</p>
                </div>
                
                <div className="mt-4 md:mt-0">
                  <span className="text-[10px] text-slate-500 block font-bold uppercase tracking-wider">Base MSRP</span>
                  <span className="text-2xl font-black text-white">${car.price.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Technical Specifications Grid */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Shield className="h-4 w-4 text-indigo-400" />
                Technical Specifications
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-850">
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Engine</span>
                  <span className="text-xs font-bold text-slate-200 mt-1 block truncate">{car.engine}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-850">
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Horsepower</span>
                  <span className="text-xs font-bold text-slate-200 mt-1 block">{car.horsepower} HP</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-850">
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Torque</span>
                  <span className="text-xs font-bold text-slate-200 mt-1 block">{car.torque ? `${car.torque} lb-ft` : "N/A"}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-850">
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Transmission</span>
                  <span className="text-xs font-bold text-slate-200 mt-1 block">{car.transmission}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-850">
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Fuel Type</span>
                  <span className="text-xs font-bold text-slate-200 mt-1 block">{car.fuelType}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-850">
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Fuel Efficiency</span>
                  <span className="text-xs font-bold text-slate-200 mt-1 block">{car.mileage} {car.fuelType === "Electric" ? "MPGe" : "mpg"}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-850">
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Seating Capacity</span>
                  <span className="text-xs font-bold text-slate-200 mt-1 block">{car.seats} Passengers</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-850">
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Safety Rating</span>
                  <span className="text-xs font-bold text-emerald-400 mt-1 block flex items-center gap-1">
                    ★ {car.safetyRating} / 5.0
                  </span>
                </div>
              </div>
            </div>

            {/* Standard Features */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" />
                Highlight Features
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {car.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-slate-950/20 border border-slate-850/50 text-xs text-slate-300">
                    <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pre-Existing Reviews Section */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-amber-400" />
                Verified Owner Reviews
              </h4>

              {car.reviews && car.reviews.length > 0 ? (
                <div className="space-y-4">
                  {car.reviews.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-xl bg-slate-950/40 border border-slate-850/80">
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <span className="text-xs font-bold text-slate-200">{rev.author}</span>
                        <div className="flex gap-0.5 text-amber-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-3 w-3 ${i < rev.rating ? "fill-amber-400" : "text-slate-800"}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed italic">"{rev.comment}"</p>
                      <span className="text-[10px] text-slate-500 block mt-2">
                        Reviewed on {new Date(rev.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded-xl border border-slate-850 bg-slate-950/20 text-center">
                  <p className="text-xs text-slate-500">No owner reviews found for this vehicle.</p>
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
