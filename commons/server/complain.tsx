import {
  fetchComplain,
  fetchComplainById,
  fetchComplainReport,
  fetchComplainReportById,
  fetchManageComplain,
  fetchManageComplainById,
} from "@/utils/complain";
import { getAuthToken } from "./authToken";

export const getComplain = async (params?: any) => {
  const { data: token } = await getAuthToken();
  let data = await fetchComplain({ Authorization: token }, params);
  return { data };
};

export const getComplainById = async (id: string | number, params?: any) => {
  const { data: token } = await getAuthToken();
  let data = await fetchComplainById({ Authorization: token }, id, params);
  return { data };
};

export const getManageComplain = async (params?: any) => {
  const { data: token } = await getAuthToken();
  let data = await fetchManageComplain({ Authorization: token }, params);
  return { data };
};

export const getManageComplainById = async (
  id: string | number,
  params?: any,
) => {
  const { data: token } = await getAuthToken();
  let data = await fetchManageComplainById(
    { Authorization: token },
    id,
    params,
  );
  return { data };
};

// ## Report
export const getComplainReport = async (params?: any) => {
  const { data: token } = await getAuthToken();
  let data = await fetchComplainReport({ Authorization: token }, params);
  return { data };
};

export const getComplainReportById = async (
  id: string | number,
  params?: any,
) => {
  const { data: token } = await getAuthToken();
  let data = await fetchComplainReportById(
    { Authorization: token },
    id,
    params,
  );
  return { data };
};
