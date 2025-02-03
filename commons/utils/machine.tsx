import axiosConfig from "@/utils/axiosConfig";

export const fetchManageMachine = async (headers: any, params?: any) => {
  try {
    const response = await axiosConfig.get(`/manage/machine`, {
      headers: headers,
      data: params,
    });

    return response.data?.data ?? null;
  } catch (err: any) {
    // console.error("Failed to fetch master data: ", err);
    return err?.response?.data?.data ?? null;
  }
};

export const fetchManageMachineById = async (
  headers: any,
  id: string | number,
  params?: any,
) => {
  try {
    const response = await axiosConfig.get(`/manage/machine/${id}`, {
      headers: headers,
      data: params,
      params: params,
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
export const insertMachine = async (headers: any, data: any) => {
  try {
    const response = await axiosConfig.post(`/manage/machine`, data, {
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
export const updateMachine = async (
  headers: any,
  id: string | number,
  data: any,
) => {
  try {
    const response = await axiosConfig.put(`/manage/machine/${id}`, data, {
      headers: headers,
    });
    return response.data ?? null;
  } catch (err: any) {
    // console.error("Failed to insert master data: ", err);
    return err?.response?.data?.data ?? null;
  }
};

export const deleteMachine = async (headers: any, id: string | number) => {
  try {
    const response = await axiosConfig.delete(`/manage/machine/${id}`, {
      headers: headers,
    });
    return response.data ?? null;
  } catch (err: any) {
    // console.error("Failed to update master data: ", err);
    return err?.response?.data?.data ?? null;
  }
};
