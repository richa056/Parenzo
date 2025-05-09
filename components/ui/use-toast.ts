import { useState, useEffect } from "react";

interface ToastProps {
  title: string;
  description: string;
  variant?: "default" | "destructive";
}

export function useToast() {
  const [toast, setToast] = useState<ToastProps | null>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return {
    toast,
    setToast,
  };
} 