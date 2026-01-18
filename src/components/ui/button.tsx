export default function Button({
  className,
  variant = "primary",
  children,
  ...props
}: any) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-xl font-bold transition-all disabled:opacity-50 disabled:pointer-events-none active:scale-95";
  const variants = {
    primary: "bg-primary text-white hover:bg-primary/90 shadow-sm",
    outline:
      "border border-gray-200 bg-white hover:bg-gray-100 text-charcoal dark:bg-white/5 dark:border-white/10 dark:text-white dark:hover:bg-white/10",
    ghost:
      "hover:bg-gray-100 text-charcoal dark:hover:bg-white/10 dark:text-white",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant as keyof typeof variants]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
