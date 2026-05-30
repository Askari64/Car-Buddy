import { cn } from "../../lib/utils";

function Slider({ className, ...props }) {
  return (
    <input
      type="range"
      className={cn("h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-primary", className)}
      {...props}
    />
  );
}

export { Slider };
