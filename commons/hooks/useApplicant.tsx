"use client";
import { useEffect, useState } from "react";
import useAuthToken from "./useAuthToken";
import {
  deleteApplicant,
  insertApplicant,
  proposeApplicant,
  updateApplicant,
} from "@/utils/applicant";

export const useInsertApplicant = () => {
  const [response, setResponse] = useState<any>(null);
  const { data: token } = useAuthToken();

  const send = async (type: string, data: any) => {
    const response = await insertApplicant(
      { Authorization: token },
      type,
      data,
    );
    return setResponse(response);
  };

  return { send, response };
};

export const useUpdateApplicant = () => {
  const [response, setResponse] = useState<any>(null);
  const { data: token } = useAuthToken();

  const send = async (type: string, id: number | string, data: any) => {
    const response = await updateApplicant(
      { Authorization: token },
      type,
      id,
      data,
    );
    return setResponse(response);
  };

  return { send, response };
};

export const useProposeApplicant = () => {
  const [response, setResponse] = useState<any>(null);
  const { data: token } = useAuthToken();

  const send = async (type: string, id: number | string) => {
    const response = await proposeApplicant({ Authorization: token }, type, id);
    return setResponse(response);
  };

  return { send, response };
};

export const useDeleteApplicant = () => {
  const [response, setResponse] = useState<any>(null);
  const { data: token } = useAuthToken();

  const send = async (type: string, id: number | string) => {
    const response = await deleteApplicant({ Authorization: token }, type, id);
    return setResponse(response);
  };

  return { send, response };
};
