"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authStore } from "@/lib/Zustand/store";

interface ProtectedUserProps {
  children: React.ReactNode;
  isProtected?: boolean;
}

export default function AuthProtection({
  children,
  isProtected = false,
}: ProtectedUserProps) {
  const router = useRouter();
  const { isAuthenticated, checkAuthStatus } = authStore();

  useEffect(() => {
    checkAuthStatus();
    if (isProtected) {
      if (!isAuthenticated) {
        router.push("/login");
      }
    }
  }, [checkAuthStatus, isAuthenticated, isProtected, router]);

  // Render the children only if the user is authenticated or if isProtected is false
  return isAuthenticated || !isProtected ? <>{children}</> : null;
}
