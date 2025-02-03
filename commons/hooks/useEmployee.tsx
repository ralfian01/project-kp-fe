"use client";
import { useEffect, useState } from "react";
import useAuthToken from "./useAuthToken";
import {
  deleteEmployee,
  fetchManageEmployee,
  insertEmployee,
  updateEmployee,
} from "@/utils/employee";

export const useFetchManageEmployee = () => {
  const [response, setResponse] = useState<any>(null);
  const { data: token } = useAuthToken();

  const fetch = async (params: any) => {
    const response = await fetchManageEmployee(
      { Authorization: token },
      params,
    );
    return setResponse(response);
  };

  return { fetch, response };
};
export const useInsertEmployee = () => {
  const [response, setResponse] = useState<any>(null);
  const { data: token } = useAuthToken();

  const send = async (data: any) => {
    const response = await insertEmployee({ Authorization: token }, data);
    return setResponse(response);
  };

  return { send, response };
};

export const useUpdateEmployee = () => {
  const [response, setResponse] = useState<any>(null);
  const { data: token } = useAuthToken();

  const send = async (id: number | string, data: any) => {
    const response = await updateEmployee({ Authorization: token }, id, data);
    return setResponse(response);
  };

  return { send, response };
};

export const useDeleteEmployee = () => {
  const [response, setResponse] = useState<any>(null);
  const { data: token } = useAuthToken();

  const send = async (id: number | string) => {
    const response = await deleteEmployee({ Authorization: token }, id);
    return setResponse(response);
  };

  return { send, response };
};
