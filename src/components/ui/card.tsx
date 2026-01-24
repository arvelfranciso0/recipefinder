export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-white/5 rounded-3xl p-8 soft-shadow border border-gray-100 dark:border-white/10">
      {children}
    </div>
  );
}
