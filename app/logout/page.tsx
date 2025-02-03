"use client";
import { redirect } from "next/navigation";
import Cookie from "js-cookie";
import React from "react";

export default function Page() {
  // Delete cookie
  Cookie.set("_auth.token", "");

  redirect("/auth/login");

  return <>Logout</>;
}
