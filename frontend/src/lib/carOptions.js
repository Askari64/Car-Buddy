import { Compass, Flame, Shield, Users, Zap } from "lucide-react";

export const defaultPreferences = {
  budget: 60000,
  useCase: "Commuting",
  category: "any",
  fuelType: "any",
  transmission: "any",
  seats: 5,
};

export const useCases = [
  {
    id: "Commuting",
    title: "Daily Commute",
    desc: "Prioritize outstanding fuel economy and easy driving.",
    icon: Zap,
    color: "text-amber-400 border-amber-500/30 bg-amber-500/5",
  },
  {
    id: "Family",
    title: "Family & Safety",
    desc: "Prioritize safety ratings and spacious seating.",
    icon: Users,
    color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/5",
  },
  {
    id: "Performance",
    title: "Speed & Performance",
    desc: "Prioritize horsepower and sporty handling.",
    icon: Flame,
    color: "text-rose-400 border-rose-500/30 bg-rose-500/5",
  },
  {
    id: "Off-road",
    title: "Adventure & Off-road",
    desc: "Prioritize torque, all-wheel drive, and utility.",
    icon: Compass,
    color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/5",
  },
];

export const categories = [
  { id: "any", title: "Any Style" },
  { id: "SUV", title: "SUV / Crossover" },
  { id: "Sedan", title: "Sedan" },
  { id: "Hatchback", title: "Hatchback" },
  { id: "Truck", title: "Pickup Truck" },
  { id: "Coupe", title: "Coupe / Sport" },
];

export const fuelTypes = [
  { id: "any", title: "Any Fuel" },
  { id: "Hybrid", title: "Hybrid" },
  { id: "Electric", title: "Electric" },
  { id: "Gasoline", title: "Gasoline" },
];

export const transmissions = [
  { id: "any", title: "No Preference" },
  { id: "Automatic", title: "Automatic" },
  { id: "Manual", title: "Manual" },
];

export const seatOptions = [4, 5];

export const sortOptions = [
  { value: "make-asc", label: "Make (A to Z)" },
  { value: "price-asc", label: "Price (Low to High)" },
  { value: "price-desc", label: "Price (High to Low)" },
  { value: "mileage-desc", label: "Highest Fuel Economy" },
  { value: "safetyRating-desc", label: "Highest Safety Rating" },
  { value: "horsepower-desc", label: "Highest Horsepower" },
];

export const bodyStyleOptions = ["SUV", "Sedan", "Hatchback", "Truck", "Coupe"];
export const fuelFilterOptions = ["Gasoline", "Hybrid", "Electric"];
export const transmissionFilterOptions = ["Automatic", "Manual"];
export const safetyFilterOptions = [
  { value: "4.0", label: "4.0 and up" },
  { value: "4.5", label: "4.5 and up" },
  { value: "5.0", label: "5.0 only" },
];

export const useCaseIcon = Shield;
