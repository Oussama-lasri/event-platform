import { forwardRef } from "react";
import { cn } from "../utils/cn";

export function Card({ className, ...props }) {
  return <div className={cn("card-modern p-6", className)} {...props} />;
}

export const Input = forwardRef(function Input({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(
        "form-input",
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
        "form-select",
        className
      )}
      {...props}
    />
  );
});

export function Button({ className, variant = "primary", ...props }) {
  const styles = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    danger: "btn-danger",
  };
  return (
    <button
      className={cn(styles[variant], className)}
      {...props}
    />
  );
}
