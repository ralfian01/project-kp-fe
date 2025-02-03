"use client";
import { useEffect, useState } from "react";
import useAuthToken from "./useAuthToken";
import {
  deleteSchedule,
  fetchManageSchedule,
  insertSchedule,
  updateSchedule,
} from "@/utils/schedule";

export const useGetManageSchedule = () => {
  const [response, setResponse] = useState<any>(null);
  const { data: token } = useAuthToken();

  const send = async (params: any) => {
    const response = await fetchManageSchedule(
      { Authorization: token },
      params,
    );
    return setResponse(response);
  };

  return { send, response };
};

export const useInsertSchedule = () => {
  const [response, setResponse] = useState<any>(null);
  const { data: token } = useAuthToken();

  const send = async (data: any) => {
    const response = await insertSchedule({ Authorization: token }, data);
    return setResponse(response);
  };

  return { send, response };
};

export const useUpdateSchedule = () => {
  const [response, setResponse] = useState<any>(null);
  const { data: token } = useAuthToken();

  const send = async (id: number | string, data: any) => {
    const response = await updateSchedule({ Authorization: token }, id, data);
    return setResponse(response);
  };

  return { send, response };
};

export const useDeleteSchedule = () => {
  const [response, setResponse] = useState<any>(null);
  const { data: token } = useAuthToken();

  const send = async (id: number | string) => {
    const response = await deleteSchedule({ Authorization: token }, id);
    return setResponse(response);
  };

  return { send, response };
};
