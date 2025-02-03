import { fetchBank } from "@/utils/bank";

export const getBank = async (params?: any) => {
  const data = await fetchBank(params);
  return { data };
};
