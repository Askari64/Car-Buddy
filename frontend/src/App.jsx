import { useState } from "react";
import CarDetailsModal from "./components/CarDetailsModal.jsx";
import CatalogView from "./components/catalog/CatalogView.jsx";
import ComparisonDrawer from "./components/ComparisonDrawer.jsx";
import Navbar from "./components/Navbar.jsx";
import RecommendationWizard from "./components/RecommendationWizard.jsx";
import { useCarCatalog } from "./hooks/useCarCatalog.js";

export default function App() {
  const [activeTab, setActiveTab] = useState("wizard");
  const [comparedCars, setComparedCars] = useState([]);
  const [activeCarId, setActiveCarId] = useState(null);
  const catalog = useCarCatalog(activeTab);

  const handleToggleCompare = (car) => {
    setComparedCars((current) => {
      const exists = current.some((compared) => compared.id === car.id);
      if (exists) return current.filter((compared) => compared.id !== car.id);

      if (current.length >= 3) {
        alert("You can compare up to 3 cars at the same time.");
        return current;
      }

      return [...current, car];
    });
  };

  return (
    <div className="flex h-dvh overflow-hidden overscroll-none bg-slate-950 font-sans text-slate-100 selection:bg-blue-600 selection:text-white">
      <div className="flex min-h-0 w-full flex-col overflow-hidden">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="min-h-0 flex-1 overflow-hidden">
          {activeTab === "wizard" && (
            <RecommendationWizard
              onOpenDetails={setActiveCarId}
              onToggleCompare={handleToggleCompare}
              comparedCars={comparedCars}
            />
          )}

          {activeTab === "browse" && (
            <CatalogView
              cars={catalog.cars}
              makes={catalog.makes}
              loading={catalog.loading}
              filters={catalog.filters}
              onFilterChange={catalog.setFilter}
              onResetFilters={catalog.resetFilters}
              onOpenDetails={setActiveCarId}
              onToggleCompare={handleToggleCompare}
              comparedCars={comparedCars}
            />
          )}
        </main>

        <ComparisonDrawer
          comparedCars={comparedCars}
          onRemove={(id) => setComparedCars((current) => current.filter((car) => car.id !== id))}
          onClear={() => setComparedCars([])}
        />

        <CarDetailsModal carId={activeCarId} onClose={() => setActiveCarId(null)} />
      </div>
    </div>
  );
}
