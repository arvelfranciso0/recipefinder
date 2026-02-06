export type AuthContextType = {
  session: string | undefined;
  setSession: (session: string | undefined) => void;
  isLoading: boolean;
};

export type LoginForm = {
  email: string;
  password: string;
};

export type SignupForm = {
  fullName: string;
  email: string;
  password: string;
};

export type VerifyForm = {
  code: string;
  id: string;
};
