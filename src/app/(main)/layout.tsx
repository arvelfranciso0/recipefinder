import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import Providers from "@/providers/auth/wrapper";
import { ThemeProvider } from "next-themes";

function ProtectedWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl min-h-screen mx-auto md:px-10 px-3 pb-20 py-8">
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
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Providers>
        <ProtectedWrapper>{children}</ProtectedWrapper>
      </Providers>
    </ThemeProvider>
  );
}
