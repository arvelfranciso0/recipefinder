import React from "react";
import { LucideIcon } from "lucide-react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  containerClassName?: string;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    { icon: Icon, className = "", containerClassName = "", type, ...props },
    ref,
  ) => {
    const id = props.id;

    // Define base styles for the input
    const baseInputStyles =
      " pr-4 py-3.5 rounded-xl border border-gray-200 bg-background transition-all outline-none text-sm focus:border-primary focus:ring-4 focus:ring-primary/10 placeholder:text-muted/40 truncate";

    // Logic for conditional padding based on icon presence
    const paddingStyles = Icon ? "pl-12" : "pl-4";

    return (
      <div className={`space-y-2 ${containerClassName}`.trim()}>
        <div className="relative">
          {Icon && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted/50">
              <Icon className="h-5 w-5" />
            </span>
          )}

          <input
            {...props}
            id={id}
            ref={ref}
            type={type}
            className={`${baseInputStyles} ${paddingStyles} ${className}`.trim()}
          />
        </div>
      </div>
    );
  },
);

InputField.displayName = "InputField";

export { InputField };
