import { ValidationResult } from "@/interface/form-interface";
import { Schema } from "@/types/form-types";
import { Url } from "next/dist/shared/lib/router/router";

export const getActiveClass = (pathname: string, path: Url): boolean => {
  return pathname === path;
};

export function capitalizeFirstLetter(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function validateSchema<T extends Record<string, any>>(
  schema: Schema<T>,
  body: any,
): ValidationResult<T> {
  const errors: Record<keyof T, string> = {} as Record<keyof T, string>;
  const data: Partial<T> = {};

  for (const key in schema) {
    const validator = schema[key];
    const value = body[key];

    console.log(`Validator ${validator} value ${value}`);

    const error = validator(value);
    if (error) {
      errors[key as keyof T] = error;
    } else {
      data[key as keyof T] = value;
    }
  }

  const valid = Object.keys(errors).length === 0;

  return valid ? { data: data as T, valid } : { errors, valid };
}
