import { Metadata } from "next";
import React from "react";
import Authentication from "@/components/Layouts/Authentication";
import Input from "@/components/Forms/Input";
import Form from "./form";

export const metadata: Metadata = {
  title: "Si-Besi - Login",
  description: "Sistem Informasi Beasiswa",
};

export default function Page() {
  return (
    <Authentication>
      <div className="w-full max-w-[450px] rounded-sm border bg-white p-5">
        <div className="my-2 text-center text-xl font-semibold">Login</div>
        <Form />
      </div>
    </Authentication>
  );
}
