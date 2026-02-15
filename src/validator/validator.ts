// Check if a string is not empty
export function required(value: string) {
  return (value ?? "").trim() === "" ? "This field is required" : undefined;
}

// Check minimum length
export function minLength(length: number) {
  return (value: string) =>
    value.length < length ? `Must be at least ${length} characters` : undefined;
}

// Check email format
export function email(value: string) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !regex.test(value) ? "Invalid email address" : undefined;
}

export function validatePassword(value: string): string | undefined {
  if (!value) return "Password is required";
  if (value.length < 8) return "Password must be at least 8 characters";
  if (!/[A-Z]/.test(value))
    return "Password must contain at least one uppercase letter";
  if (!/[a-z]/.test(value))
    return "Password must contain at least one lowercase letter";
  if (!/[0-9]/.test(value)) return "Password must contain at least one number";
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
    return "Password must contain at least one special character";
  return undefined; // valid
}
