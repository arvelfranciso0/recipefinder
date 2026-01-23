"use client";

import { createContext, useContext, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
}

// interface IsLogIn {
//   isLoggedIn: boolean;
// }

type IsLogIn = boolean | null;

// Refactor this to use the proper authentication
interface AuthContextType {
  isLogin: IsLogIn | null;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
  isLogin,
}: {
  children: ReactNode;
  isLogin: IsLogIn | null;
}) {
  return (
    <AuthContext.Provider
      value={{ isLogin: isLogin, isAuthenticated: !!isLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
