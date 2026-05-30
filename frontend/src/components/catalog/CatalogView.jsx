import CarCard from "../CarCard";
import CatalogFilters from "./CatalogFilters";
import { Button } from "../ui/button";

export default function CatalogView({
  cars,
  makes,
  loading,
  filters,
  onFilterChange,
  onResetFilters,
  onOpenDetails,
  onToggleCompare,
  comparedCars,
}) {
  return (
    <section className="h-full overflow-y-auto overflow-x-hidden overscroll-contain px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl pb-28">
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-white">Explore Catalog</h2>
            <p className="mt-1 text-xs text-slate-400">Search, filter, and compare makes, models, and specifications.</p>
          </div>
        </div>

        <CatalogFilters filters={filters} makes={makes} onFilterChange={onFilterChange} onReset={onResetFilters} />

        {loading ? (
          <div className="flex min-h-80 flex-col items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-800 border-t-blue-500" />
            <span className="mt-4 text-xs font-semibold tracking-wide text-slate-400">Searching inventory...</span>
          </div>
        ) : cars.length === 0 ? (
          <div className="rounded-lg border border-slate-800 bg-slate-900/20 py-16 text-center">
            <p className="text-slate-400">No cars match your search query and filters.</p>
            <Button variant="ghost" className="mt-3 text-blue-400 hover:text-blue-300" onClick={onResetFilters}>
              Clear filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                onOpenDetails={onOpenDetails}
                onToggleCompare={onToggleCompare}
                isCompared={comparedCars.some((compared) => compared.id === car.id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
