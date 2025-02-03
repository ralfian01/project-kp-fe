import { Metadata } from "next";
import React from "react";
import Authentication from "@/components/Layouts/Authentication";
import Form from "./form";
import { getProvinces } from "@/server/regions/provinces";

export const metadata: Metadata = {
  title: "Si-Besi - Daftar",
  description: "Sistem Informasi Beasiswa",
};

export default async function Page() {
  const { data: provinces } = await getProvinces();

  return (
    <Authentication>
      <div className="w-full max-w-[450px] rounded-sm border bg-white p-5">
        <div className="my-2 text-center text-xl font-semibold">Daftar</div>
        <Form provinces={provinces} />
      </div>
    </Authentication>
  );
}
