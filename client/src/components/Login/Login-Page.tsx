"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { LampContainer } from "../ui/lamp";
import { LoginForm } from "@/components/Login/Login-Form";
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

  return (
    <>
      <LampContainer className="w-screen">
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="w-full bg-black/50 py-2 px-6 rounded-lg "
        >
          <div className="">
            <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20 text-2xl font-bold text-center text">
              User Login
            </p>

            <LoginForm />
          </div>
        </motion.h1>
      </LampContainer>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        gutter={20}
        toastOptions={{
          duration: 4000,
        }}
      />
    </>
  );
}
