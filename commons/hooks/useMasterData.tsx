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

// ## Master data
export const useMasterData = (params?: any) => {
  const [data, setData] = useState<any>(null);
  const { data: token } = useAuthToken();

  useEffect(() => {
    const fetchData = async () => {
      const masterData = await fetchMasterData(
        { Authorization: token },
        params,
      );
      setData(masterData);
    };

    fetchData();
  }, []);

  return { data };
};

export const useMasterDataById = (id: number | string) => {
  const [data, setData] = useState<any>(null);
  const { data: token } = useAuthToken();

  useEffect(() => {
    const fetchData = async () => {
      const masterDataById = await fetchMasterDataById(
        { Authorization: token },
        id,
      );
      setData(masterDataById);
    };

    fetchData();
  }, []);

  return { data };
};

export const useInsertMasterData = () => {
  const [response, setResponse] = useState<any>(null);
  const { data: token } = useAuthToken();

  const send = async (data: any) => {
    const response = await insertMasterData({ Authorization: token }, data);
    return setResponse(response);
  };

  return { send, response };
};

export const useUpdateMasterData = () => {
  const [response, setResponse] = useState<any>(null);
  const { data: token } = useAuthToken();

  const send = async (id: number | string, data: any) => {
    const response = await updateMasterData({ Authorization: token }, id, data);
    return setResponse(response);
  };

  return { send, response };
};

// ## Master data allocation
export const useInsertMasterDataAllocation = () => {
  const [response, setResponse] = useState<any>(null);
  const { data: token } = useAuthToken();

  const send = async (budget_id: string | number, data: any) => {
    const response = await insertMasterDataAllocation(
      { Authorization: token },
      budget_id,
      data,
    );
    return setResponse(response);
  };

  return { send, response };
};

export const useUpdateMasterDataAllocation = () => {
  const [response, setResponse] = useState<any>(null);
  const { data: token } = useAuthToken();

  const send = async (
    budget_id: number | string,
    id: number | string,
    data: any,
  ) => {
    const response = await updateMasterDataAllocation(
      { Authorization: token },
      budget_id,
      id,
      data,
    );
    return setResponse(response);
  };

  return { send, response };
};

export const useDeleteMasterDataAllocation = () => {
  const [response, setResponse] = useState<any>(null);
  const { data: token } = useAuthToken();

  const send = async (budget_id: number | string, id: number | string) => {
    const response = await deleteMasterDataAllocation(
      { Authorization: token },
      budget_id,
      id,
    );
    return setResponse(response);
  };

  return { send, response };
};
