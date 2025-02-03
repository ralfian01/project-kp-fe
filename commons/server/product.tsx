import { fetchManageProduct, fetchManageProductById } from "@/utils/product";
import { getAuthToken } from "./authToken";

export const getManageProduct = async (params?: any) => {
  const { data: token } = await getAuthToken();
  let data = await fetchManageProduct({ Authorization: token }, params);
  return { data };
};

export const getManageProductById = async (
  id: string | number,
  params?: any,
) => {
  const { data: token } = await getAuthToken();
  let data = await fetchManageProductById({ Authorization: token }, id, params);
  return { data };
};
