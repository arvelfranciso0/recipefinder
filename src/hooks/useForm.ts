import { Errors, UseFormReturnType, Validators } from "@/types/form-types";
import { useState } from "react";

export default function useForm<T extends Record<string, any>>(
  initialValue: T,
  validateValue: Validators<T>,
): UseFormReturnType<T> {
  const [values, setValues] = useState<T>(initialValue);
  const [errors, setErrors] = useState<Errors<T>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit =
    (callback: (values: T) => void) => (event: React.FormEvent) => {
      event.preventDefault();

      if (validate()) {
        callback(values);
      }
    };
  const validate = () => {
    const newErrors: Errors<T> = {};
    if (validateValue) {
      for (const key in validateValue) {
        const validator = validateValue[key as keyof T];
        if (validator) {
          const error = validator(values[key]);
          if (error) newErrors[key as keyof T] = error;
        }
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReset = () => {
    setValues(initialValue);
    setErrors({});
    setIsSubmitting(false);
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    handleReset,
  };
}
