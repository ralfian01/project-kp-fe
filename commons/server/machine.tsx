import { fetchManageMachine, fetchManageMachineById } from "@/utils/machine";
import { getAuthToken } from "./authToken";
import { fetchManageEmployee, fetchManageEmployeeById } from "@/utils/employee";

export const getManageMachine = async (params?: any) => {
  const { data: token } = await getAuthToken();
  let data = await fetchManageMachine({ Authorization: token }, params);
  return { data };
};

export const getManageMachineById = async (
  id: string | number,
  params?: any,
) => {
  const { data: token } = await getAuthToken();
  let data = await fetchManageMachineById({ Authorization: token }, id, params);
  return { data };
};
