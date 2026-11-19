import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface FloatingSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
}

const FloatingSelect = React.forwardRef<HTMLSelectElement, FloatingSelectProps>(
  ({ className, label, id, children, ...props }, ref) => {
    const generatedId = React.useId();
    const selectId = id || generatedId;

    return (
      <div className="grid min-w-0 gap-1.5">
        <label htmlFor={selectId} className="text-sm font-medium text-light-secondary-text">
          {label}
        </label>
        <div className="relative">
          <select
            id={selectId}
            className={cn(
              "peer block w-full h-12 py-2 pl-3.5 rounded-full border border-gray-300 bg-transparent pr-10 text-sm text-gray-900 appearance-none focus:border-primary focus:outline-none focus:ring-0",
              className,
            )}
            ref={ref}
            {...props}
          >
            {children}
          </select>
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500 peer-focus:text-primary">
            <ChevronDown aria-hidden="true" className="h-4 w-4" />
          </div>
        </div>
      </div>
    );
  },
);
FloatingSelect.displayName = "FloatingSelect";

export { FloatingSelect };
