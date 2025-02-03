"use client";
import Cookie from "js-cookie";

const useAuthToken = () => {
  const authToken = Cookie.get("_auth.token");
  return { data: authToken };
};

export default useAuthToken;
