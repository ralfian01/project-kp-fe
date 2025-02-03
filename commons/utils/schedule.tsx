import axiosConfig from "@/utils/axiosConfig";

export const fetchManageSchedule = async (headers: any, params?: any) => {
  try {
    const response = await axiosConfig.get(`/manage/schedule`, {
      headers: headers,
      data: params,
    });

    return response.data?.data ?? null;
  } catch (err: any) {
    // console.error("Failed to fetch master data: ", err);
    return err?.response?.data?.data ?? null;
  }
};

export const fetchManageScheduleById = async (
  headers: any,
  id: string | number,
  params?: any,
) => {
  try {
    const response = await axiosConfig.get(`/manage/schedule/${id}`, {
      headers: headers,
      data: params,
    });

    return response.data?.data ?? null;
  } catch (err: any) {
    // console.error("Failed to fetch master data: ", err);
    return err?.response?.data?.data ?? null;
  }
};

/**
 * Create machine
 * @param headers
 * @param data
 * @returns
 */
export const insertSchedule = async (headers: any, data: any) => {
  try {
    const response = await axiosConfig.post(`/manage/schedule`, data, {
      headers: headers,
    });
    return response.data ?? null;
  } catch (err: any) {
    // console.error("Failed to insert master data: ", err);
    return err?.response?.data?.data ?? null;
  }
};

/**
 * Create applicant draft
 * @param headers
 * @param data
 * @returns
 */
export const updateSchedule = async (
  headers: any,
  id: string | number,
  data: any,
) => {
  try {
    const response = await axiosConfig.put(`/manage/schedule/${id}`, data, {
      headers: headers,
    });
    return response.data ?? null;
  } catch (err: any) {
    // console.error("Failed to insert master data: ", err);
    return err?.response?.data?.data ?? null;
  }
};

export const deleteSchedule = async (headers: any, id: string | number) => {
  try {
    const response = await axiosConfig.delete(`/manage/schedule/${id}`, {
      headers: headers,
    });
    return response.data ?? null;
  } catch (err: any) {
    // console.error("Failed to update master data: ", err);
    return err?.response?.data?.data ?? null;
  }
};
