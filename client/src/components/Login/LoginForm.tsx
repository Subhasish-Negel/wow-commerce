"use client";


import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signupSchema } from "@/lib/signupSchema";
import z from "zod";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
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
import { BASE_URL } from "@/api/constant/constant";
import { useState } from "react";

export function ProfileForm() {
  const [emailError, setEmailError] = useState<String | null>(null);
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
  });
  async function onSubmit(values: z.infer<typeof signupSchema>) {
    const fetcher = async (
      url: string,
      values: z.infer<typeof signupSchema>
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
      const data = await fetcher(`${BASE_URL}/auth/register`, values);
      console.log(data.message);
      setEmailError(null);
    } catch (error: any) {
      if (error.status === 400) {
        toast.error("Email already exists. Please log in.");
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-normal">User Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="username"
                  {...field}
                  className="border-2 border-gray-500 focus-visible:ring-blue-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
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
              {emailError ? (
                <FormDescription className="text-red-500">
                  {emailError}
                </FormDescription>
              ) : (
                <FormDescription>Enter a Valid Email Address</FormDescription>
              )}
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
              <FormControl>
                <Input
                  type="password"
                  placeholder="examplE@1234"
                  {...field}
                  className="border-2 border-gray-500 focus-visible:ring-blue-500"
                />
              </FormControl>
              <FormDescription>8 - 16 Characters Required</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password_confirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-normal">Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="examplE@1234"
                  {...field}
                  className="border-2 border-gray-500 focus-visible:ring-blue-500"
                />
              </FormControl>
              <FormDescription>Re-Type Your Password</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
