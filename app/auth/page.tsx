"use client";
import useAuthToken from "@/hooks/useAuthToken";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Page() {
  const { data: token } = useAuthToken();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    } else {
      router.push("/");
    }
  }, [token]);

  return <></>;
}
