import { useState } from "react";
import useAuthToken from "./useAuthToken";
import {
  finalizeApplication,
  rejectApplication,
  reviseApplication,
  verifyApplication,
} from "@/utils/application";

export const useRejectApplication = () => {
  const [response, setResponse] = useState<any>(null);
  const { data: token } = useAuthToken();

  const send = async (id: number | string) => {
    const response = await rejectApplication({ Authorization: token }, id);
    return setResponse(response);
  };

  return { send, response };
};

export const useReviseApplication = () => {
  const [response, setResponse] = useState<any>(null);
  const { data: token } = useAuthToken();

  const send = async (id: number | string, data: any) => {
    const response = await reviseApplication(
      { Authorization: token },
      id,
      data,
    );
    return setResponse(response);
  };

  return { send, response };
};

export const useVerifyApplication = () => {
  const [response, setResponse] = useState<any>(null);
  const { data: token } = useAuthToken();

  const send = async (id: number | string) => {
    const response = await verifyApplication({ Authorization: token }, id);
    return setResponse(response);
  };

  return { send, response };
};

export const useFinalizeApplication = () => {
  const [response, setResponse] = useState<any>(null);
  const { data: token } = useAuthToken();

  const send = async (id: number | string) => {
    const response = await finalizeApplication({ Authorization: token }, id);
    return setResponse(response);
  };

  return { send, response };
};
