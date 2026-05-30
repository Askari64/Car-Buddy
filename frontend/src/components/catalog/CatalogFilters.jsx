import { RotateCcw, Search } from "lucide-react";
import { bodyStyleOptions, fuelFilterOptions, safetyFilterOptions, sortOptions, transmissionFilterOptions } from "../../lib/carOptions";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Select } from "../ui/select";

function FilterSelect({ label, value, onChange, children, className }) {
  return (
    <label className={className}>
      <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-slate-500">{label}</span>
      <Select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 border-slate-800 bg-slate-950/60 text-xs text-slate-300"
      >
        {children}
      </Select>
    </label>
  );
}

export default function CatalogFilters({ filters, makes, onFilterChange, onReset }) {
  return (
    <Card className="mb-6 border-slate-800 bg-slate-900/40 text-slate-100 shadow-none backdrop-blur-xl">
      <CardContent className="space-y-5 p-4 md:p-5">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative grow">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <Input
              value={filters.search}
              onChange={(event) => onFilterChange("search", event.target.value)}
              placeholder="Search make, model, variant, or type..."
              className="h-11 border-slate-800 bg-slate-950/60 pl-10 text-xs text-slate-200 placeholder:text-slate-500"
            />
          </div>

          <Select
            value={filters.sortBy}
            onChange={(event) => onFilterChange("sortBy", event.target.value)}
            className="h-11 w-full border-slate-800 bg-slate-950/60 text-xs text-slate-300 md:w-64"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

          <Button variant="subtle" className="h-11 md:w-auto" onClick={onReset}>
            <RotateCcw />
            Reset
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3 border-t border-slate-800 pt-4 md:grid-cols-5">
          <FilterSelect label="Manufacturer" value={filters.selectedMake} onChange={(value) => onFilterChange("selectedMake", value)}>
            <option value="">All Makes</option>
            {makes.map((make) => (
              <option key={make} value={make}>
                {make}
              </option>
            ))}
          </FilterSelect>

          <FilterSelect label="Body Style" value={filters.selectedCategory} onChange={(value) => onFilterChange("selectedCategory", value)}>
            <option value="">All Styles</option>
            {bodyStyleOptions.map((style) => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </FilterSelect>

          <FilterSelect label="Fuel Type" value={filters.selectedFuel} onChange={(value) => onFilterChange("selectedFuel", value)}>
            <option value="">All Fuels</option>
            {fuelFilterOptions.map((fuel) => (
              <option key={fuel} value={fuel}>
                {fuel}
              </option>
            ))}
          </FilterSelect>

          <FilterSelect label="Transmission" value={filters.selectedTransmission} onChange={(value) => onFilterChange("selectedTransmission", value)}>
            <option value="">All Gears</option>
            {transmissionFilterOptions.map((transmission) => (
              <option key={transmission} value={transmission}>
                {transmission}
              </option>
            ))}
          </FilterSelect>

          <FilterSelect
            label="Min Safety"
            value={filters.selectedSafety}
            onChange={(value) => onFilterChange("selectedSafety", value)}
            className="col-span-2 md:col-span-1"
          >
            <option value="">Any Rating</option>
            {safetyFilterOptions.map((rating) => (
              <option key={rating.value} value={rating.value}>
                {rating.label}
              </option>
            ))}
          </FilterSelect>
        </div>
      </CardContent>
    </Card>
  );
}
