import axiosConfig from "@/utils/axiosConfig";

export const fetchManageEmployee = async (headers: any, params?: any) => {
  try {
    const response = await axiosConfig.get(`/manage/employee`, {
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

export const fetchManageEmployeeById = async (
  headers: any,
  id: string | number,
  params?: any,
) => {
  try {
    const response = await axiosConfig.get(`/manage/employee/${id}`, {
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
 * Create employee
 * @param headers
 * @param data
 * @returns
 */
export const insertEmployee = async (headers: any, data: any) => {
  try {
    const response = await axiosConfig.post(`/manage/employee`, data, {
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
export const updateEmployee = async (
  headers: any,
  id: string | number,
  data: any,
) => {
  try {
    const response = await axiosConfig.put(`/manage/employee/${id}`, data, {
      headers: headers,
    });
    return response.data ?? null;
  } catch (err: any) {
    // console.error("Failed to insert master data: ", err);
    return err?.response?.data?.data ?? null;
  }
};

export const deleteEmployee = async (headers: any, id: string | number) => {
  try {
    const response = await axiosConfig.delete(`/manage/employee/${id}`, {
      headers: headers,
    });
    return response.data ?? null;
  } catch (err: any) {
    // console.error("Failed to update master data: ", err);
    return err?.response?.data?.data ?? null;
  }
};
