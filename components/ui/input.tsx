import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn("flex h-10 w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm", className)}
      ref={ref}
      {...props}
    />
  )
)
Input.displayName = "Input"

export { Input }
