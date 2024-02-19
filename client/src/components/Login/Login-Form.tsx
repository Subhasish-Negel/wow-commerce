"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { loginSchema } from "@/lib/schemas/loginSchema";
import z from "zod";
import toast from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BASE_URL } from "@/lib/constant/constant";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export function LoginForm() {
  const [passType, setPassType] = useState("password");
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const fetcher = async (
      url: string,
      values: z.infer<typeof loginSchema>
    ) => {
      const response: any = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const error: any = new Error(
          "An error occurred while registering the user"
        );

        // Attach extra info to the error object.
        error.info = await response.json();
        error.status = response.status;
        throw error;
      }

      return response.json();
    };

    try {
      const data = await fetcher(`${BASE_URL}/auth/login`, values);
      toast.success(data.message);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error: any) {
      if (error.status === 401) {
        toast.error(error.info.error.message);
      } else {
        toast.error("Server is Broken. Please Try Again");
      }
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-normal">Email Address</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="email"
                  {...field}
                  className="border-2 border-gray-500 focus-visible:ring-blue-500"
                />
              </FormControl>

              <FormDescription>Enter a Valid Email Address</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-normal">Password</FormLabel>
              <div className="flex">
                <FormControl>
                  <Input
                    type={passType}
                    placeholder="example@1234"
                    {...field}
                    className="border-2 border-gray-500 focus-visible:ring-blue-500"
                  />
                </FormControl>
                {passType === "password" ? (
                  <span
                    className="my-auto pl-2 hidden sm:block"
                    onClick={() => setPassType("text")}
                  >
                    <AiFillEyeInvisible size={20} />
                  </span>
                ) : (
                  <span
                    className="my-auto pl-2 hidden sm:block"
                    onClick={() => setPassType("password")}
                  >
                    <AiFillEye size={20} />
                  </span>
                )}
              </div>
              <FormDescription>8 - 16 Characters Required</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <button
            type="submit"
            className="hover:scale-[1.03] active:scale-[.97] transition-all ease-in-out relative inline-flex overflow-hidden rounded-sm p-[3px] focus:outline-none active:ring-2 active:ring-slate-400 active:ring-offset-2 focus:ring-offset-slate-50"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-sm bg-slate-900 px-4 py-2 text-sm font-medium text-white  backdrop-blur-3xl">
              Login
            </span>
          </button>
          <Link
            className="hover:text-blue-500 hover:underline font-medium flex items-center justify-center text-gray-300 text-sm transition-all duration-300 ease-in-out"
            href="/signup"
          >
            Sign Up?
          </Link>
        </div>
      </form>
    </Form>
  );
}
