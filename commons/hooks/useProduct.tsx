"use client";
import { useEffect, useState } from "react";
import useAuthToken from "./useAuthToken";
import {
  deleteProduct,
  fetchManageProduct,
  insertProduct,
  updateProduct,
} from "@/utils/product";

export const useFetchManageProduct = () => {
  const [response, setResponse] = useState<any>(null);
  const { data: token } = useAuthToken();

  const fetch = async (params: any) => {
    const response = await fetchManageProduct({ Authorization: token }, params);
    return setResponse(response);
  };

  return { fetch, response };
};

export const useInsertProduct = () => {
  const [response, setResponse] = useState<any>(null);
  const { data: token } = useAuthToken();

  const send = async (data: any) => {
    const response = await insertProduct({ Authorization: token }, data);
    return setResponse(response);
  };

  return { send, response };
};

export const useUpdateProduct = () => {
  const [response, setResponse] = useState<any>(null);
  const { data: token } = useAuthToken();

  const send = async (id: number | string, data: any) => {
    const response = await updateProduct({ Authorization: token }, id, data);
    return setResponse(response);
  };

  return { send, response };
};

export const useDeleteProduct = () => {
  const [response, setResponse] = useState<any>(null);
  const { data: token } = useAuthToken();

  const send = async (id: number | string) => {
    const response = await deleteProduct({ Authorization: token }, id);
    return setResponse(response);
  };

  return { send, response };
};
