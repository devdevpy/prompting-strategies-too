import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  size?: "sm" | "default";
  variant?: "outline" | "destructive" | "default";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild = false, size = "default", variant = "default", ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center rounded-2xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:pointer-events-none disabled:opacity-50",
          size === "sm" ? "h-8 px-3 text-sm" : "h-10 px-4 py-2",
          variant === "outline" ? "border border-slate-300 bg-white text-slate-800" : "",
          variant === "destructive" ? "bg-red-600 text-white hover:bg-red-700" : "",
          variant === "default" ? "bg-blue-600 text-white hover:bg-blue-700" : "",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
