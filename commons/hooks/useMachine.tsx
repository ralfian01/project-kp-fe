"use client";
import { useEffect, useState } from "react";
import useAuthToken from "./useAuthToken";
import {
  deleteMachine,
  fetchManageMachine,
  insertMachine,
  updateMachine,
} from "@/utils/machine";

export const useFetchManageMachine = () => {
  const [response, setResponse] = useState<any>(null);
  const { data: token } = useAuthToken();

  const fetch = async (params: any) => {
    const response = await fetchManageMachine({ Authorization: token }, params);
    return setResponse(response);
  };

  return { fetch, response };
};

export const useInsertMachine = () => {
  const [response, setResponse] = useState<any>(null);
  const { data: token } = useAuthToken();

  const send = async (data: any) => {
    const response = await insertMachine({ Authorization: token }, data);
    return setResponse(response);
  };

  return { send, response };
};

export const useUpdateMachine = () => {
  const [response, setResponse] = useState<any>(null);
  const { data: token } = useAuthToken();

  const send = async (id: number | string, data: any) => {
    const response = await updateMachine({ Authorization: token }, id, data);
    return setResponse(response);
  };

  return { send, response };
};

export const useDeleteMachine = () => {
  const [response, setResponse] = useState<any>(null);
  const { data: token } = useAuthToken();

  const send = async (id: number | string) => {
    const response = await deleteMachine({ Authorization: token }, id);
    return setResponse(response);
  };

  return { send, response };
};
