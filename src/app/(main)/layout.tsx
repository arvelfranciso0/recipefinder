"use client";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { DashboardSkeleton } from "@/components/shared/dashboardSkeleton";
import { AuthProvider, useAuth } from "@/providers/auth-providers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function ProtectedWrapper({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login"); // redirect if unauthorized
    }
  }, [loading, user, router]);

  if (loading || !user) return <DashboardSkeleton />;

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto md:px-10 px-3 pb-20 py-8">
        {children}
      </main>
      <Footer />
    </>
  );
}
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthProvider>
        <ProtectedWrapper>{children}</ProtectedWrapper>
      </AuthProvider>
    </>
  );
}
