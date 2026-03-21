import { LogOut } from "lucide-react";
import { logoutAction } from "./action";

export default function LogoutPage() {
  const handleLogout = async () => {
    await logoutAction();
  };
  return (
    <button
      onClick={handleLogout}
      className="cursor-pointer w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 font-semibold"
    >
      <LogOut className="w-5 h-5" />
      <span>Sign Out</span>
    </button>
  );
}
