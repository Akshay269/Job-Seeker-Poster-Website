import { Loader2 } from "lucide-react";

const Spinner = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="p-4 rounded-full bg-white shadow-md">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    </div>
  );
};

export default Spinner;
