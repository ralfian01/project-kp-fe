import { fetchVillages } from "@/utils/regions/villages";

export const getVillages = async (params?: any) => {
  const data = await fetchVillages(params);
  return { data };
};
