"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkCookieExists, fetchUserData } from "@/lib/api/FetchUser";
import { authStore } from "@/lib/Zustand/store";
import { fetcher } from "@/lib/api/CheckAuth";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // Initially set to true

  useEffect(() => {
    const objectLength = userData ? Object.keys(userData).length : 0;

    // const checkAuth = async () => {};

    const fetchUser = async () => {
      if (isProtected !== undefined) {
        try {
          await fetcher();
        } catch (error: any) {
          if (error.status === 401) {
            // window.location.href = "/login";
            router.push("/login");
          } else {
            toast.error("Server Is Broken AF");
          }
        }
      }

      if (objectLength < 1 && token) {
        const user = await fetchUserData();
        setUserData(user);
      }
      setIsAuthenticated(true);
    };

    fetchUser();
  }, [isProtected, router, setUserData, token, userData]);

  if (!isAuthenticated) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="flex text-7xl gap-4">
          <AiOutlineLoading3Quarters className="animate-spin" />
          <p>Now Loading...</p>
        </div>
        <p className="text-xl mt-10">
          If still loading after 1 min, Please Reload the Page
        </p>
      </div>
    );
  }

  // Render the children only after user data has been fetched or if isProtected is not true
  return isAuthenticated ? <>{children}</> : null;
}
