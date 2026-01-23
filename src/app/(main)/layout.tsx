"use client";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { AuthProvider } from "@/providers/auth-providers";
import { useEffect, useState } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //*TODO: Impelment a proper authentication
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const isAuth: boolean | null =
      localStorage.getItem("isAuth") !== null
        ? JSON.parse(localStorage.getItem("isAuth")!)
        : null;
    setIsLoggedIn(isAuth);
  }, []);
  return (
    <>
      <AuthProvider isLogin={isLoggedIn}>
        <Navbar />
        <main className="max-w-7xl mx-auto md:px-10 px-3 pb-20 py-8">
          {children}
        </main>
        <Footer />
      </AuthProvider>
    </>
  );
}
