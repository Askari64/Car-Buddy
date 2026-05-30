import { useEffect, useMemo, useState } from "react";

const initialFilters = {
  search: "",
  selectedMake: "",
  selectedCategory: "",
  selectedFuel: "",
  selectedTransmission: "",
  selectedSafety: "",
  sortBy: "make-asc",
};

export function useCarCatalog(activeTab) {
  const [cars, setCars] = useState([]);
  const [makes, setMakes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const response = await fetch(`${apiUrl}/api/cars/makes`);
        const data = await response.json();
        setMakes(data);
      } catch (error) {
        console.error("Error fetching makes:", error);
      }
    };

    fetchMakes();
  }, []);

  useEffect(() => {
    if (activeTab !== "browse") return;

    const fetchCars = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (filters.search) params.append("q", filters.search);
        if (filters.selectedMake) params.append("make", filters.selectedMake);
        if (filters.selectedCategory) params.append("category", filters.selectedCategory);
        if (filters.selectedFuel) params.append("fuelType", filters.selectedFuel);
        if (filters.selectedTransmission) params.append("transmission", filters.selectedTransmission);
        if (filters.selectedSafety) params.append("minSafetyRating", filters.selectedSafety);
        if (filters.sortBy) params.append("sortBy", filters.sortBy);

        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const response = await fetch(`${apiUrl}/api/cars?${params.toString()}`);
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(fetchCars, 250);
    return () => clearTimeout(delayDebounce);
  }, [activeTab, filters]);

  const actions = useMemo(
    () => ({
      setFilter(name, value) {
        setFilters((current) => ({ ...current, [name]: value }));
      },
      resetFilters() {
        setFilters(initialFilters);
      },
    }),
    []
  );

  return {
    cars,
    makes,
    loading,
    filters,
    ...actions,
  };
}
