import { Loader2Icon } from "lucide-react";

export default function Spinner({ isLoading = true, className = "w-10 h-10 text-black" }) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/10">
      <Loader2Icon className={`animate-spin ${className}`} />
    </div>
  );
}
