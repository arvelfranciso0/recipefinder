"use client";
import { UserSettings } from "@/types/user-types";
import { useTheme } from "next-themes";
import { createContext, useContext, useEffect, ReactNode } from "react";

interface AuthContextType {
  user: UserSettings | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
  user,
}: {
  children: ReactNode;
  user: UserSettings | null;
}) {
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
