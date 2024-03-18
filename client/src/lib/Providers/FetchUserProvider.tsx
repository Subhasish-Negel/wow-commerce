"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkCookieExists, fetchUserData } from "@/lib/api/FetchUser";
import { authStore } from "@/lib/Zustand/store";

interface ProtectedUserProps {
  children: React.ReactNode;
  isProtected?: boolean;
}

export default function FetchUserProvider({
  children,
  isProtected,
}: ProtectedUserProps) {
  const router = useRouter();
  const { userData, setUserData } = authStore();
  const token = checkCookieExists("jwtoken");
  const [isUserDataFetched, setIsUserDataFetched] = useState(false);

  useEffect(() => {
    const objectLength = userData ? Object.keys(userData).length : 0;
    const fetchUser = async () => {
      if (isProtected !== undefined && !token) {
        router.replace("/login");
        return;
      }
      if (objectLength < 1 && token) {
        const user = await fetchUserData();
        setUserData(user);
      }
      setIsUserDataFetched(true);
    };

    fetchUser();
  }, [router, setUserData, token, userData, isProtected]);

  // Render the children only after user data has been fetched or if isProtected is not true
  return isUserDataFetched || isProtected === undefined ? (
    <>{children}</>
  ) : null;
}
