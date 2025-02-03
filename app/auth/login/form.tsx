"use client";
import React, { useEffect, useRef, useState } from "react";
import ButtonDefault from "@/components/Buttons/ButtonDefault";
import Input from "@/components/Forms/Input";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLogin, useSetToken } from "@/hooks/useAuthentication";
import AlertWarning from "@/components/Alerts/AlertWarning";

export default function Form() {
  const [responseElement, setResponseElement] = useState<any>(null);
  const [submitStatus, setSubmitStatus] = useState(false);
  const formRef = useRef(null);
  const router = useRouter();

  const { setToken } = useSetToken();
  const { send, response } = useLogin();
  const handleSubmit = (evt: any) => {
    evt.preventDefault();

    setResponseElement(null);

    setSubmitStatus(true);

    const form = evt.target;
    const jsonPayload = {
      username: form.username.value,
      password: form.password.value,
    };

    send(jsonPayload);

    setTimeout(() => {
      setSubmitStatus(false);
    }, 5000);
  };

  useEffect(() => {
    if (response?.code == 200) {
      setSubmitStatus(false);
      router.push("/");

      setToken(response.data.token);
    } else if (response?.code == 400) {
      router.refresh();
    } else if (response?.code == 401) {
      setResponseElement(
        <AlertWarning
          title="Login gagal"
          description="Username atau password salah"
          className="mb-3"
          size="SMALL"
          icon={false}
        />,
      );
    }
  }, [response]);

  return (
    <>
      {responseElement}

      <form ref={formRef} onSubmit={handleSubmit}>
        <Input
          label="Username"
          type="text"
          placeholder="user@mail.com"
          className="w-full"
          name="username"
          required={true}
          validationRules={{
            required: (val: any) => (!val ? "Wajib diisi" : ""),
          }}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Masukan password"
          className="mt-4 w-full"
          name="password"
          required={true}
          validationRules={{
            required: (val: any) => (!val ? "Wajib diisi" : ""),
          }}
        />

        <ButtonDefault
          label="Login"
          className="mt-4 w-full rounded-[5px] bg-primary px-4 py-[7px] text-white"
          loading={submitStatus}
        />

        <div className="mt-3   text-center">
          Belum punya akun?{" "}
          <Link href="/auth/register" className="font-semibold text-primary">
            Daftar sekarang
          </Link>
        </div>
      </form>
    </>
  );
}
