"use client";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/lib/constant/constant";
import { useRouter } from "next/navigation";
import toast, { Toaster, useToasterStore } from "react-hot-toast";

export default function Login() {
  const { toasts } = useToasterStore();
  const TOAST_LIMIT = 4;

  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit?
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts]);

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/auth/admin/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        console.log("Login successful");
        toast.success("Login Successful");
        setTimeout(() => {
          router.push("/");
        }, 1500);
      } else {
        toast.error("UnAuthorized");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-950 dark:to-gray-900">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-gray-800">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 opacity-50 blur-xl dark:from-gray-950 dark:to-gray-900" />
        <div className="relative z-10 px-6 py-8 sm:px-10">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Admin Login</h2>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Enter your email and password to access the admin dashboard.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="mt-1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </form>
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              This is an admin-only login. If you need access, please contact
              your system administrator.
            </div>
          </div>
        </div>
      </div>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        gutter={20}
        toastOptions={{
          duration: 2000,
        }}
      />
    </div>
  );
}
