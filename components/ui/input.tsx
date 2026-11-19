import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, id, ...props }, ref) => {
    // Generate a stable ID if one isn't provided to link label and input
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="grid min-w-0 gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-light-secondary-text">
            {label}
          </label>
        )}
        <input
          type={type}
          id={inputId}
          className={cn(
            "block w-full rounded-control border border-brand-border bg-transparent px-6 py-3 text-sm text-light-primary-text appearance-none",
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
