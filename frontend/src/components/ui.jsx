import { forwardRef } from "react";
import { cn } from "../utils/cn";

export function Card({ className, ...props }) {
  return <div className={cn("rounded-xl border border-slate-200 bg-white p-5 shadow-sm", className)} {...props} />;
}

export const Input = forwardRef(function Input({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-violet-200 transition focus:ring-2",
        className
      )}
      {...props}
    />
  );
});

export const Select = forwardRef(function Select({ className, ...props }, ref) {
  return (
    <select
      ref={ref}
      className={cn(
        "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-violet-200 transition focus:ring-2",
        className
      )}
      {...props}
    />
  );
});

export function Button({ className, variant = "primary", ...props }) {
  const styles = {
    primary: "bg-slate-900 text-white hover:bg-slate-700",
    secondary: "bg-white border border-slate-300 text-slate-900 hover:bg-slate-50",
    danger: "bg-rose-600 text-white hover:bg-rose-500",
  };
  return (
    <button
      className={cn("rounded-lg px-4 py-2 text-sm font-medium transition disabled:opacity-50", styles[variant], className)}
      {...props}
    />
  );
}
