"use client";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "./providers";
import { UserSettings } from "@/types/user-types";

export default function Providers({
  children,
  user,
}: {
  children: React.ReactNode;
  user: UserSettings | null;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider user={user}>{children}</AuthProvider>;
    </ThemeProvider>
  );
}
