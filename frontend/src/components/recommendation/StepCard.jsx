import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function StepCard({
  icon: Icon,
  iconClassName = "bg-blue-500/10 text-blue-400",
  title,
  description,
  children,
  onBack,
  onNext,
  nextLabel = "Continue",
  submit = false,
  showBack = true,
}) {
  return (
    <Card className="flex min-h-0 flex-1 flex-col border-slate-800 bg-slate-900/50 text-slate-100 shadow-none backdrop-blur-xl">
      <CardHeader className="p-5 pb-0 md:p-6 md:pb-0">
        <div className="flex items-center gap-3">
          <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", iconClassName)}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-lg text-white">{title}</CardTitle>
            <CardDescription className="text-xs text-slate-400">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col justify-between p-5 md:p-6">
        <div className="min-h-0">{children}</div>
        <div className={cn("mt-8 flex", showBack ? "justify-between" : "justify-end")}>
          {showBack && (
            <Button variant="subtle" onClick={onBack}>
              <ArrowLeft />
              Back
            </Button>
          )}
          <Button variant={submit ? "gradient" : "brand"} onClick={onNext}>
            {submit && <Sparkles />}
            {nextLabel}
            {!submit && <ArrowRight />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
