import { fetchDistricts } from "@/utils/regions/districts";

export const getDistricts = async (params?: any) => {
  const data = await fetchDistricts(params);
  return { data };
};
