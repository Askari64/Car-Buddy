import { Compass, Landmark, Shield, Zap } from "lucide-react";
import { categories, fuelTypes, seatOptions, transmissions, useCases } from "../../lib/carOptions";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import StepCard from "./StepCard";

function OptionButton({ selected, children, className, ...props }) {
  return (
    <button
      type="button"
      className={cn(
        "rounded-lg border border-slate-800 bg-slate-950/40 px-3 py-3 text-xs font-bold text-slate-400 transition-all hover:border-slate-700 hover:bg-slate-950/60",
        selected && "border-blue-500 bg-blue-600 text-white shadow-lg shadow-indigo-600/10",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function BudgetStep({ preferences, setPreferences, onNext }) {
  return (
    <StepCard
      icon={Landmark}
      title="What is your maximum budget?"
      description="We will find matches within this price range."
      onNext={onNext}
      showBack={false}
    >
      <div className="mt-8 text-center">
        <span className="text-4xl font-extrabold text-white">${preferences.budget.toLocaleString()}</span>
      </div>
      <Slider
        min="25000"
        max="150000"
        step="2500"
        value={preferences.budget}
        onChange={(event) => setPreferences({ ...preferences, budget: parseInt(event.target.value, 10) })}
        className="mt-6 bg-slate-800 accent-blue-500"
      />
      <div className="mt-2 flex justify-between text-xs font-medium text-slate-500">
        <span>$25,000</span>
        <span>$85,000</span>
        <span>$150,000+</span>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[35000, 50000, 75000, 130000].map((preset) => (
          <Button
            key={preset}
            variant={preferences.budget === preset ? "brand" : "subtle"}
            size="sm"
            onClick={() => setPreferences({ ...preferences, budget: preset })}
          >
            ${preset.toLocaleString()}
          </Button>
        ))}
      </div>
    </StepCard>
  );
}

export function UseCaseStep({ preferences, setPreferences, onBack, onNext }) {
  return (
    <StepCard
      icon={Shield}
      iconClassName="bg-indigo-500/10 text-indigo-400"
      title="How will you primarily use the car?"
      description="This prioritizes fuel economy, power, safety, or utility."
      onBack={onBack}
      onNext={onNext}
    >
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {useCases.map((useCase) => {
          const Icon = useCase.icon;
          const selected = preferences.useCase === useCase.id;

          return (
            <button
              key={useCase.id}
              type="button"
              onClick={() => setPreferences({ ...preferences, useCase: useCase.id })}
              className={cn(
                "flex min-h-28 items-start rounded-lg border p-4 text-left transition-all",
                selected
                  ? "border-indigo-500 bg-indigo-500/5 text-white shadow-lg shadow-indigo-500/5"
                  : "border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700"
              )}
            >
              <div className={cn("mr-4 rounded-lg border p-2.5", selected ? useCase.color : "border-slate-800 bg-slate-900")}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-100">{useCase.title}</h4>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">{useCase.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </StepCard>
  );
}

export function BodyStyleStep({ preferences, setPreferences, onBack, onNext }) {
  return (
    <StepCard
      icon={Compass}
      iconClassName="bg-cyan-500/10 text-cyan-400"
      title="Do you have a preferred body style?"
      description="Select standard vehicle designs or keep options open."
      onBack={onBack}
      onNext={onNext}
    >
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {categories.map((category) => (
          <OptionButton
            key={category.id}
            selected={preferences.category === category.id}
            onClick={() => setPreferences({ ...preferences, category: category.id })}
          >
            {category.title}
          </OptionButton>
        ))}
      </div>
      <div className="mt-8 border-t border-slate-800 pt-6">
        <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-300">Minimum seats needed</h4>
        <div className="flex gap-2">
          {seatOptions.map((seats) => (
            <OptionButton
              key={seats}
              selected={preferences.seats === seats}
              onClick={() => setPreferences({ ...preferences, seats })}
              className="h-11 w-20"
            >
              {seats} Seats
            </OptionButton>
          ))}
        </div>
      </div>
    </StepCard>
  );
}

export function PowertrainStep({ preferences, setPreferences, onBack, onSubmit }) {
  return (
    <StepCard
      icon={Zap}
      iconClassName="bg-emerald-500/10 text-emerald-400"
      title="Fuel & transmission preferences"
      description="Specify drivetrain configurations or keep options open."
      onBack={onBack}
      onNext={onSubmit}
      nextLabel="Generate Matches"
      submit
    >
      <div className="mt-6 space-y-6">
        <div>
          <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-300">Fuel Efficiency / Drive type</h4>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {fuelTypes.map((fuelType) => (
              <OptionButton
                key={fuelType.id}
                selected={preferences.fuelType === fuelType.id}
                onClick={() => setPreferences({ ...preferences, fuelType: fuelType.id })}
              >
                {fuelType.title}
              </OptionButton>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-300">Transmission</h4>
          <div className="grid grid-cols-3 gap-3">
            {transmissions.map((transmission) => (
              <OptionButton
                key={transmission.id}
                selected={preferences.transmission === transmission.id}
                onClick={() => setPreferences({ ...preferences, transmission: transmission.id })}
              >
                {transmission.title}
              </OptionButton>
            ))}
          </div>
        </div>
      </div>
    </StepCard>
  );
}
