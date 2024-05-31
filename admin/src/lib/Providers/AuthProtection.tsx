"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authStore } from "@/lib/Zustand/store";

interface ProtectedUserProps {
  children: React.ReactNode;
}

export default function AuthProtection({ children }: ProtectedUserProps) {
  const router = useRouter();
  const { isAuthenticated, checkAuthStatus } = authStore();

  useEffect(() => {
    checkAuthStatus();

    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [checkAuthStatus, isAuthenticated, router]);

  return isAuthenticated ? <>{children}</> : null;
}


