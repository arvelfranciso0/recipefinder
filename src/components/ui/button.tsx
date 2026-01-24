import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "warning";
  children: React.ReactNode;
}

export default function Button({
  className = "",
  variant = "primary",
  children,
  type = "button", // Default to button to prevent accidental form submits
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-xl font-bold transition-all px-6 py-3 disabled:opacity-50 disabled:pointer-events-none active:scale-95 cursor-pointer text-sm";

  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary-foreground hover:text-gray-800 shadow-lg shadow-primary/20",
    outline:
      "border border-gray-200 hover:bg-primary hover:border-primary-foreground text-foreground shadow-sm",
    ghost: "hover:bg-gray-100 hover:text-primary text-muted ",
    warning: "bg-red-800  hover:bg-red-500",
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
