"use client";
import { useEffect, useState } from "react";
import {
  fetchMyAccount,
  fetchMyAccountPrivileges,
  proposeMyApplication,
  updateMyApplicationDraft,
} from "@/utils/myAccount";
import useAuthToken from "./useAuthToken";

/**
 * Get account data
 * @returns
 */
export const useMyAccountData = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: myAccount } = await fetchMyAccount();
      setData(myAccount);
    };

    fetchData();
  }, []);

  return { data };
};

/**
 * Get account privileges
 * @returns
 */
export const useMyAccountPrivileges = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: myAccountPrivileges } = await fetchMyAccountPrivileges();
      setData(myAccountPrivileges);
    };

    fetchData();
  }, []);

  return { data };
};

// ## My application
export const useUpdateMyApplicationDraft = () => {
  const [response, setResponse] = useState<any>(null);
  const { data: token } = useAuthToken();

  const send = async (data: any) => {
    const response = await updateMyApplicationDraft(
      { Authorization: token },
      data,
    );
    return setResponse(response);
  };

  return { send, response };
};

export const useProposeMyApplication = () => {
  const [response, setResponse] = useState<any>(null);
  const { data: token } = useAuthToken();

  const send = async () => {
    const response = await proposeMyApplication({ Authorization: token });
    return setResponse(response);
  };

  return { send, response };
};
