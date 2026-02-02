export interface ValidationValidResult<T> {
  data: Partial<T>; // Validated values
  valid: boolean; // Whether validation passed
}

export interface ValidationInvalidResultTrue<T> {
  errors?: Record<keyof T, string>; // Errors for each field
  valid: boolean; // Whether validation passed
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface SignupForm {
  fullName: string;
  email: string;
  password: string;
}
