"use client";
import { useEffect, useState } from "react";
import {
  deleteMasterDataAllocation,
  fetchMasterData,
  fetchMasterDataById,
  insertMasterData,
  insertMasterDataAllocation,
  updateMasterData,
  updateMasterDataAllocation,
} from "@/utils/masterData";
import useAuthToken from "./useAuthToken";
import {
  deleteComplain,
  insertComplain,
  updateComplain,
} from "@/utils/complain";

// ## Complain
export const useInsertComplain = () => {
  const [response, setResponse] = useState<any>(null);
  const { data: token } = useAuthToken();

  const send = async (data: any) => {
    const response = await insertComplain({ Authorization: token }, data);
    return setResponse(response);
  };

  return { send, response };
};

export const useUpdateComplain = () => {
  const [response, setResponse] = useState<any>(null);
  const { data: token } = useAuthToken();

  const send = async (id: number | string, data: any) => {
    const response = await updateComplain({ Authorization: token }, id, data);
    return setResponse(response);
  };

  return { send, response };
};

export const useDeleteComplain = () => {
  const [response, setResponse] = useState<any>(null);
  const { data: token } = useAuthToken();

  const send = async (id: number | string) => {
    const response = await deleteComplain({ Authorization: token }, id);
    return setResponse(response);
  };

  return { send, response };
};
