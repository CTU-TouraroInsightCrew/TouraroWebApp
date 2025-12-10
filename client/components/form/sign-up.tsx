/*
 * This file is part of TouraroWebApp.
 * Licensed under the GPL-3.0-only License.
 * Copyright (c) 2025 CTU-TouraroInsightCrew
 */

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import GoogleSignInButton from "./google-login-button";

// 🔥 THÊM 2 IMPORT NÀY
import { useAuth } from "@/components/auth/auth-provider";
import { BACKEND_URL } from "@/lib/auth";

const FormSchema = z
  .object({
    username: z.string().min(1, "Username is required").max(100),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z.string().min(8, "Password must have than 8 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

const SignUpForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  // 🔥 LẤY refreshUser
  const { refreshUser } = useAuth();

      const form = useForm({
      resolver: zodResolver(FormSchema),
        defaultValues: {
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        },
      });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setError("");
    console.log("👉 SUBMIT SIGNUP VALUES:", values);

    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.username,
          email: values.email,
          password: values.password,
        }),
      });

      console.log("👉 RESPONSE STATUS:", res.status);

      const text = await res.text();
      console.log("👉 RAW RESPONSE BODY:", text);

      let data: any = {};
      try {
        data = JSON.parse(text);
      } catch {
        data = {};
      }

      if (!res.ok) {
        setError(data.message || "Register failed");
        return;
      }

      // ✅ LƯU TOKEN
      localStorage.setItem("token", data.token);

      // ✅ CẬP NHẬT USER TRONG CONTEXT
      await refreshUser();

      // ✅ CHUYỂN TRANG
      if (data.user?.role === "admin") router.push("/admin");
      else router.push("/");
    } catch (e) {
      console.error("👉 FETCH ERROR:", e);
      setError("Server error, please try again.");
    }
  };

  return (
    <div
      id="signup"
      className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="space-y-2">
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <FormField
              control={form.control}
              name="username"
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="mail@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel>Re-Enter your password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Re-Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button className="w-full mt-6 bg-[#0059B3]" type="submit">
            Sign up
          </Button>
        </form>

        <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:grow before:bg-stone-400 after:ml-4 after:block before:h-px after:grow after:bg-stone-400">
          or
        </div>

        <GoogleSignInButton>Sign up with Google</GoogleSignInButton>

        <p className="text-center text-sm text-gray-600 mt-2">
          If you have an account, please{" "}
          <Link className="text-blue-500 hover:underline" href="/login">
            Login
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default SignUpForm;
