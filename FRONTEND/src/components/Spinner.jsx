// Spinner.jsx
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";

export default function Spinner({ minDuration = 5000, className = "" }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), minDuration);
    return () => clearTimeout(timer);
  }, [minDuration]);

  return (
    visible && (
      <Loader2Icon className={`animate-spin ${className}`} />
    )
  );
}
