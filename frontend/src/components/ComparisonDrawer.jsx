import { useState } from "react";
import { ChevronDown, ChevronUp, Scale, Trash2 } from "lucide-react";
import { Button } from "./ui/button";

const specs = [
  {
    label: "MSRP",
    getValue: (car) => `$${car.price.toLocaleString()}`,
    valueClassName: "text-white font-black",
  },
  {
    label: "Body",
    getValue: (car) => car.category,
  },
  {
    label: "Efficiency",
    getValue: (car) => `${car.mileage} ${car.fuelType === "Electric" ? "MPGe" : "mpg"}`,
  },
  {
    label: "Safety",
    getValue: (car) => `${car.safetyRating} / 5.0`,
    valueClassName: "text-emerald-400 font-bold",
  },
  {
    label: "Power",
    getValue: (car) => `${car.horsepower} HP`,
  },
];

export default function ComparisonDrawer({ comparedCars, onRemove, onClear }) {
  const [isOpen, setIsOpen] = useState(true);

  if (comparedCars.length === 0) return null;

  const slots = [
    ...comparedCars,
    ...Array.from({ length: Math.max(0, 3 - comparedCars.length) }, (_, index) => ({ id: `empty-${index}`, empty: true })),
  ];

  return (
    <section className="z-50 shrink-0 border-t border-slate-800 bg-slate-950/95 shadow-2xl shadow-black/30 backdrop-blur-xl">
      <div
        onClick={() => setIsOpen((current) => !current)}
        className="flex cursor-pointer select-none items-center justify-between border-b border-slate-800 bg-slate-900/80 px-4 py-2.5 transition-colors hover:bg-slate-900 sm:px-6"
      >
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-indigo-500/20 bg-indigo-500/10 text-indigo-300">
            <Scale className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <div className="truncate text-xs font-bold uppercase tracking-wider text-white">
              Comparing {comparedCars.length} of 3 Vehicles
            </div>
            <div className="hidden truncate text-[11px] text-slate-500 sm:block">
              {comparedCars.map((car) => `${car.make} ${car.model}`).join(" vs ")}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-[10px] uppercase text-slate-400 hover:text-white"
            onClick={(event) => {
              event.stopPropagation();
              onClear();
            }}
          >
            Clear
          </Button>
          <button className="rounded-md p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white" type="button">
            {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
          <div className="grid grid-cols-[6.5rem_repeat(3,minmax(0,1fr))] gap-2">
            <div className="rounded-md border border-slate-800 bg-slate-900/40 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Specs
            </div>

            {slots.map((car) =>
              car.empty ? (
                <div
                  key={car.id}
                  className="flex min-h-12 items-center justify-center rounded-md border border-dashed border-slate-800 bg-slate-900/20 px-2 text-center text-[10px] font-semibold text-slate-600"
                >
                  Add car
                </div>
              ) : (
                <div key={car.id} className="flex min-h-12 items-center justify-between gap-2 rounded-md border border-slate-800 bg-slate-900/45 px-3 py-2">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-black leading-4 text-white">
                      {car.make} {car.model}
                    </div>
                    <div className="truncate text-[10px] font-semibold text-slate-500">
                      {car.variant} - {car.year}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemove(car.id)}
                    className="shrink-0 rounded-md p-1 text-slate-500 transition-colors hover:bg-slate-950 hover:text-rose-400"
                    title="Remove from comparison"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              )
            )}

            {specs.map((spec) => (
              <div key={spec.label} className="contents">
                <div className="rounded-md border border-slate-800/70 bg-slate-950/40 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-500">
                  {spec.label}
                </div>
                {slots.map((car) => (
                  <div
                    key={`${spec.label}-${car.id}`}
                    className="min-w-0 rounded-md border border-slate-800/70 bg-slate-950/30 px-3 py-1.5 text-xs font-semibold text-slate-300"
                  >
                    <span className={`block truncate ${spec.valueClassName ?? ""}`}>
                      {car.empty ? "-" : spec.getValue(car)}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
