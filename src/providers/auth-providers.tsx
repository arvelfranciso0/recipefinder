"use client";
import { User, UserSettings } from "@/types/user-types";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useTheme } from "next-themes";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface AuthContextType {
  user: UserSettings | null;
  loading: boolean;

  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserSettings | null>(null);
  const { setTheme } = useTheme();
  const [loading, setLoading] = useState(true);

  async function refreshUser() {
    setLoading(true);
    try {
      await axios
        .get("/api/auth/me", { withCredentials: true })
        .then((res: AxiosResponse) => {
          setUser(res.data.user);
          const theme = res.data.user.theme as string;
          setTheme(theme.toLowerCase());
        })
        .catch((error: AxiosError) => {
          setUser(null);
        });
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
