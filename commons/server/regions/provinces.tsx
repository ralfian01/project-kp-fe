import { fetchProvinces } from "@/utils/regions/provinces";

export const getProvinces = async (params?: any) => {
  const data = await fetchProvinces(params);
  return { data };
};
