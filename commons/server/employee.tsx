import { getAuthToken } from "./authToken";
import { fetchManageEmployee, fetchManageEmployeeById } from "@/utils/employee";

export const getManageEmployee = async (params?: any) => {
  const { data: token } = await getAuthToken();
  let data = await fetchManageEmployee({ Authorization: token }, params);
  return { data };
};

export const getManageEmployeeById = async (
  id: string | number,
  params?: any,
) => {
  const { data: token } = await getAuthToken();
  let data = await fetchManageEmployeeById(
    { Authorization: token },
    id,
    params,
  );
  return { data };
};
