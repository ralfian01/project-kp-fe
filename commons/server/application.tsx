import { getAuthToken } from "./authToken";
import { fetchApplication, fetchApplicationById } from "@/utils/application";

export const getApplication = async (params?: any) => {
  const { data: token } = await getAuthToken();
  let data = await fetchApplication({ Authorization: token }, params);
  return { data };
};

export const getApplicationById = async (id: string | number, params?: any) => {
  const { data: token } = await getAuthToken();
  let data = await fetchApplicationById({ Authorization: token }, id, params);
  return { data };
};
