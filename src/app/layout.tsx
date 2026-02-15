import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ToastProvider } from "@/context/toastContext";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Recipe Finder - Discover Delicious Meals",
  description: "Find your next favorite meal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en" className={`${jakarta.variable}`}>
      <body>
        <ToastProvider>
          <div className="antialiased transition-colors duration-300">
            {children}
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
