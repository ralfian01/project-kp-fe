import { getAuthToken } from "./authToken";
import { fetchMasterDataCategory } from "@/utils/masterDataCategory";

export const getMasterDataCategory = async (params?: any) => {
  const { data: token } = await getAuthToken();
  let data = await fetchMasterDataCategory({ Authorization: token }, params);
  return { data };
};
