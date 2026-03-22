import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { getUser } from "@/providers/auth/_server";
import Providers from "@/providers/auth/wrapper";

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
export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) return null;
  return (
    <Providers user={user}>
      <ProtectedWrapper>{children}</ProtectedWrapper>
    </Providers>
  );
}
