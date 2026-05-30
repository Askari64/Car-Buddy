import { Eye, Scale, Star } from "lucide-react";
import { Button } from "./ui/button";

export default function CarCard({ car, onOpenDetails, onToggleCompare, isCompared }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-slate-800 bg-slate-900/25 backdrop-blur-xl transition-all duration-300 hover:border-slate-700 hover:shadow-2xl hover:shadow-indigo-500/5">
      <div className="relative h-44 w-full shrink-0 overflow-hidden border-b border-slate-800 bg-slate-950">
        {car.imageUrl ? (
          <img
            src={car.imageUrl}
            alt={`${car.make} ${car.model}`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-900 text-slate-600">No Image</div>
        )}

        <span className="absolute left-3 top-3 rounded border border-white/5 bg-slate-900/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-300 backdrop-blur-md">
          {car.category}
        </span>
        <span className="absolute bottom-3 right-3 rounded-md bg-blue-600 px-2.5 py-1 text-xs font-black text-white shadow-lg">
          ${car.price.toLocaleString()}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h4 className="truncate text-base font-bold text-white transition-colors group-hover:text-blue-400">
                {car.make} {car.model}
              </h4>
              <p className="truncate text-xs font-medium text-slate-400">
                {car.variant} - {car.year}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-1 rounded border border-slate-800 bg-slate-950/40 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
              <Star className="h-3 w-3 fill-emerald-400 text-emerald-400" />
              <span>{car.safetyRating}</span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] text-slate-400">
            <div className="rounded border border-slate-800/60 bg-slate-950/30 px-2 py-1">
              <span className="block text-[9px] font-semibold uppercase text-slate-500">Engine / Drivetrain</span>
              <span className="block truncate font-semibold text-slate-300">{car.fuelType} ({car.transmission})</span>
            </div>
            <div className="rounded border border-slate-800/60 bg-slate-950/30 px-2 py-1">
              <span className="block text-[9px] font-semibold uppercase text-slate-500">Efficiency</span>
              <span className="block truncate font-semibold text-slate-300">
                {car.mileage} {car.fuelType === "Electric" ? "MPGe" : "mpg"}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5 flex gap-2 border-t border-slate-800 pt-3">
          <Button variant="subtle" size="sm" className="flex-1 bg-slate-950/30" onClick={() => onOpenDetails(car.id)}>
            <Eye />
            Specs
          </Button>
          <Button variant={isCompared ? "gradient" : "subtle"} size="sm" className="flex-1" onClick={() => onToggleCompare(car)}>
            <Scale />
            {isCompared ? "Compared" : "Compare"}
          </Button>
        </div>
      </div>
    </div>
  );
}
