"use client";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { AuthProvider, useAuth } from "@/providers/auth-providers";

function ProtectedWrapper({ children }: { children: React.ReactNode }) {
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
