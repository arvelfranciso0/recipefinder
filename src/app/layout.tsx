import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

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
    <html lang="en" className={jakarta.variable}>
      <body className="antialiased transition-colors duration-300">
        <div className="min-h-screen">
          <Navbar />
          <main className="max-w-7xl mx-auto px-6 pb-20">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
