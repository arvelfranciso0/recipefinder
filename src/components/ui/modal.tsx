export default function Modal({
  children,
  onClose,
  isOpen,
}: {
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-foreground/20 dark:bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      {children}
    </div>
  );
}
