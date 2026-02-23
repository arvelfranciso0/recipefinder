import { getUser } from "./_server";
import { AuthProvider } from "./providers";

export default async function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  return <AuthProvider user={user}>{children}</AuthProvider>;
}
