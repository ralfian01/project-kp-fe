import { getAuthToken } from "./authToken";
import {
  fetchMyAccount,
  fetchMyAccountPrivileges,
  fetchMyApplication,
} from "@/utils/myAccount";

export const getMyAccount = async (params?: any) => {
  const { data: token } = await getAuthToken();
  const data = await fetchMyAccount({ Authorization: token }, params);
  return { data };
};

export const getMyAccountPrivileges = async () => {
  const { data: token } = await getAuthToken();
  const data = await fetchMyAccountPrivileges({ Authorization: token });
  return { data };
};

// ## Application
export const getMyApplication = async () => {
  const { data: token } = await getAuthToken();
  const data = await fetchMyApplication({ Authorization: token });
  return { data };
};
