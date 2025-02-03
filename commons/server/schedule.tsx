import { getAuthToken } from "./authToken";
import { fetchManageSchedule, fetchManageScheduleById } from "@/utils/schedule";

export const getManageSchedule = async (params?: any) => {
  const { data: token } = await getAuthToken();
  let data = await fetchManageSchedule({ Authorization: token }, params);
  return { data };
};

export const getManageScheduleById = async (
  id: string | number,
  params?: any,
) => {
  const { data: token } = await getAuthToken();
  let data = await fetchManageScheduleById(
    { Authorization: token },
    id,
    params,
  );
  return { data };
};
