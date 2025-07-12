import { Loader2Icon } from "lucide-react";

export default function Spinner({ isLoading = true, className = "w-10 h-10 text-black" }) {
  if (!isLoading) return null;

  return (
      <Loader2Icon className={`animate-spin ${className}`} />
  );
}
