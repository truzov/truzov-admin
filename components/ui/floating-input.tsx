import React from "react";
import { cn } from "@/lib/utils";

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ className, label, id, ...props }, ref) => {
    // Generate a unique ID if not provided, though typically controlled by parent for accessibility
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="grid min-w-0 gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-light-secondary-text">
          {label}
        </label>
        <input
          type="text"
          id={inputId}
          className={cn(
            "block w-full h-14 rounded-control border border-brand-border bg-transparent px-3.5 py-2 text-sm text-light-primary-text appearance-none",
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);

FloatingInput.displayName = "FloatingInput";

export { FloatingInput };
