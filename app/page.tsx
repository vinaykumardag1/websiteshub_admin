"use client";

import { redirect } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

export default function Home() {
  const { accessToken } = useAuthStore();

  if (!accessToken) {
    redirect("/auth/login");
  }

  redirect("/dashboard");
}
