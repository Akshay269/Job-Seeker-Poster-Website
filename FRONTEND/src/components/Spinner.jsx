
import { Loader2Icon } from "lucide-react";

const Spinner = ({ className = "" }) => (
  <Loader2Icon className={`animate-spin w-5 h-5 text-blue-600 ${className}`} />
);

export default Spinner;
