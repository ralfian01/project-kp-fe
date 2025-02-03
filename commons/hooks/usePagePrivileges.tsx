"use client";
import { useEffect, useState } from "react";
import { useMyAccountPrivileges } from "./useMyAccount";
import { arrayHas } from "@/helpers/array";

const usePagePrivileges = (rules: any) => {
  const [status, setStatus] = useState(true);
  const { data: privileges = [] } = useMyAccountPrivileges();

  useEffect(() => {
    if (arrayHas(privileges, rules) < rules.length) {
      setStatus(false);
    } else {
      setStatus(true);
    }
  }, [privileges]);

  return { status };
};

export default usePagePrivileges;
