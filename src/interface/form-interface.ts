export interface ValidationResult<T> {
  data?: Partial<T>; // Validated values
  errors?: Record<keyof T, string>; // Errors for each field
  valid: boolean; // Whether validation passed
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface SignupForm {
  fullname: string;
  email: string;
  password: string;
}
