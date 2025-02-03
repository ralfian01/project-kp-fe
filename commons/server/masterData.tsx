import { getAuthToken } from "./authToken";
import {
  fetchMasterData,
  fetchMasterDataAllocation,
  fetchMasterDataAllocationById,
  fetchMasterDataById,
  fetchMasterDataSummary,
} from "@/utils/masterData";

// ## Master data
export const getMasterData = async (params?: any) => {
  const { data: token } = await getAuthToken();
  const data = await fetchMasterData({ Authorization: token }, params);
  return { data };
};

export const getMasterDataSummary = async () => {
  const { data: token } = await getAuthToken();
  const data = await fetchMasterDataSummary({ Authorization: token });
  return { data };
};

export const getMasterDataById = async (id?: string | number) => {
  const { data: token } = await getAuthToken();
  const data = await fetchMasterDataById({ Authorization: token }, id);
  return { data };
};

// ## Master data allocation
export const getMasterDataAllocation = async (
  budget_id: string | number,
  params?: any,
) => {
  const { data: token } = await getAuthToken();
  const data = await fetchMasterDataAllocation(
    { Authorization: token },
    budget_id,
    params,
  );
  return { data };
};

export const getMasterDataAllocationById = async (
  budget_id: string | number,
  id: string | number,
  params?: any,
) => {
  const { data: token } = await getAuthToken();
  const data = await fetchMasterDataAllocationById(
    { Authorization: token },
    budget_id,
    id,
  );
  return { data };
};
