import React from "react";
import { cn } from "@/lib/utils";

interface FloatingTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const FloatingTextarea = React.forwardRef<
  HTMLTextAreaElement,
  FloatingTextareaProps
>(({ className, label, id, ...props }, ref) => {
  const generatedId = React.useId();
  const inputId = id || generatedId;

  return (
    <div className="grid min-w-0 gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-light-secondary-text">
        {label}
      </label>
      <textarea
        id={inputId}
        className={cn(
          "block px-3.5 py-3 w-full text-sm text-light-primary-text bg-transparent rounded-2xl border border-gray-500/20 appearance-none focus:outline-none focus:ring-0 focus:border-primary h-[150px] resize-none",
          className,
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});

FloatingTextarea.displayName = "FloatingTextarea";

export { FloatingTextarea };
