import { Sparkles } from "lucide-react";
import { Badge } from "../ui/badge";

export default function QuizHeader({ step }) {
  const progress = Math.min(((step - 1) / 3) * 100, 100);

  return (
    <div className="flex h-auto lg:h-full flex-col justify-between gap-4 lg:gap-8 rounded-lg border border-slate-800 bg-slate-900/30 p-5 backdrop-blur-xl lg:p-6">
      <div>
        <Badge variant="subtle" className="mb-4 gap-1.5 border-indigo-500/20 bg-indigo-500/10 text-indigo-300">
          <Sparkles className="h-3.5 w-3.5" />
          AI Recommendations
        </Badge>
        <h2 className="text-3xl font-extrabold tracking-tight text-white lg:text-5xl">Find Your Ideal Drive</h2>
        <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">
          Tune the match criteria, then compare recommendations without leaving the quiz.
        </p>
      </div>

      <div>
        <div className="h-2 overflow-hidden rounded-full border border-slate-800 bg-slate-950">
          <div className="h-full bg-linear-to-r from-blue-500 to-indigo-500 transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
          <span>Step {step} of 4</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
}
