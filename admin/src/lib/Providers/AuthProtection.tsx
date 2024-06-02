"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authStore } from "@/lib/Zustand/store";

interface ProtectedUserProps {
  children: React.ReactNode;
}

export default function AuthProtection({ children }: ProtectedUserProps) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { isAuthenticated, checkAuthStatus, setIsAuthenticated } = authStore();

  useEffect(() => {
    const checkAuth = async () => {
      await checkAuthStatus();
      setLoading(false);
      if (!isAuthenticated && !loading) {
        router.push("/login");
      }
    };

    checkAuth();
  }, [checkAuthStatus, isAuthenticated, loading, router]);


  return isAuthenticated && !loading ? <>{children}</> : null;
}
