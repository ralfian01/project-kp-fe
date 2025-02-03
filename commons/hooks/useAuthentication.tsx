"use client";
import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { fetchLogin, fetchRegisterAccount } from "@/utils/authentication";

// ## Login
export const useLogin = () => {
  const [response, setResponse] = useState<any>(null);
  const send = async (data: any) => {
    const token = btoa(`${data.username ?? null}:${data.password ?? null}`);

    const response = await fetchLogin(
      { Authorization: `Basic ${token}` },
      data,
    );
    return setResponse(response);
  };

  return { send, response };
};

export const useSetToken = () => {
  const setToken = (token: string) => {
    Cookie.set("_auth.token", `Bearer ${token}`);
  };

  return { setToken };
};

// ## Register
export const useRegisterAccount = () => {
  const [response, setResponse] = useState<any>(null);
  const send = async (data: any) => {
    const response = await fetchRegisterAccount(data);
    return setResponse(response);
  };

  return { send, response };
};
