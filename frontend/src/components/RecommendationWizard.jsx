import { useState } from "react";
import { defaultPreferences } from "../lib/carOptions";
import MatchResults from "./recommendation/MatchResults";
import QuizHeader from "./recommendation/QuizHeader";
import { BodyStyleStep, BudgetStep, PowertrainStep, UseCaseStep } from "./recommendation/QuizSteps";

export default function RecommendationWizard({ onOpenDetails, onToggleCompare, comparedCars }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [preferences, setPreferences] = useState(defaultPreferences);

  const handleNext = () => setStep((current) => Math.min(current + 1, 5));
  const handleBack = () => setStep((current) => Math.max(current - 1, 1));

  const resetQuiz = () => {
    setStep(1);
    setResults([]);
    setPreferences(defaultPreferences);
  };

  const getResults = async () => {
    setLoading(true);
    setStep(5);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/cars/recommendations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(preferences),
      });
      const data = await response.json();

      setTimeout(() => {
        setResults(data);
        setLoading(false);
      }, 900);
    } catch (error) {
      console.error("Error matching cars:", error);
      setLoading(false);
    }
  };

  const stepProps = {
    preferences,
    setPreferences,
    onBack: handleBack,
    onNext: handleNext,
  };

  return (
    <section className="h-full overflow-y-auto no-scrollbar px-4 py-5 sm:px-6 lg:px-8">
      <div
        className={
          step < 5
            ? "mx-auto flex w-full max-w-7xl flex-col gap-5 lg:grid lg:grid-cols-[minmax(18rem,24rem)_minmax(0,1fr)]"
            : "flex h-full w-full min-h-0 flex-col"
        }
      >
        {step < 5 && <QuizHeader step={step} />}

        <div className={step < 5 ? "flex flex-col" : "flex min-h-0 flex-1 overflow-hidden"}>
          {step === 1 && <BudgetStep {...stepProps} />}
          {step === 2 && <UseCaseStep {...stepProps} />}
          {step === 3 && <BodyStyleStep {...stepProps} />}
          {step === 4 && <PowertrainStep {...stepProps} onSubmit={getResults} />}
          {step === 5 && (
            <MatchResults
              loading={loading}
              results={results}
              comparedCars={comparedCars}
              onReset={resetQuiz}
              onOpenDetails={onOpenDetails}
              onToggleCompare={onToggleCompare}
            />
          )}
        </div>
      </div>
    </section>
  );
}
