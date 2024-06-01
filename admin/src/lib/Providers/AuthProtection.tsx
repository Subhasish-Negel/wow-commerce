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
  const { isAuthenticated, checkAuthStatus } = authStore();

  useEffect(() => {
    checkAuthStatus();
    setLoading(false);

    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [checkAuthStatus, isAuthenticated, router]);

  if (loading) {
    return null;
  }

  return isAuthenticated ? <>{children}</> : null;
}
