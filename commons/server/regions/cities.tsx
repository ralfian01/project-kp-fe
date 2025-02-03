import { fetchCities } from "@/utils/regions/cities";

export const getCities = async (params?: any) => {
  const data = await fetchCities(params);
  return { data };
};
