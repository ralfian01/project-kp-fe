import axiosConfig from "@/utils/axiosConfig";

export const fetchApplication = async (headers: any, params?: any) => {
  try {
    const response = await axiosConfig.get(`/manage/application`, {
      headers: headers,
      data: params ?? {},
    });

    return response.data?.data ?? null;
  } catch (err: any) {
    // console.error("Failed to fetch master data: ", err);
    return err?.response?.data;
  }
};

export const fetchApplicationById = async (
  headers: any,
  id: string | number,
  params?: any,
) => {
  try {
    const response = await axiosConfig.get(`/manage/application/${id}`, {
      headers: headers,
      data: params,
    });

    return response.data?.data ?? null;
  } catch (err: any) {
    // console.error("Failed to fetch master data: ", err);
    return err?.response?.data;
  }
};

/**
 * Reject application
 * @param headers
 * @param data
 * @returns
 */
export const rejectApplication = async (headers: any, id: string | number) => {
  try {
    const response = await axiosConfig.put(
      `/manage/application/reject/${id}`,
      {},
      {
        headers: headers,
      },
    );
    return response.data ?? null;
  } catch (err: any) {
    // console.error("Failed to insert master data: ", err);
    return err?.response?.data;
  }
};

/**
 * Reject application
 * @param headers
 * @param data
 * @returns
 */
export const reviseApplication = async (
  headers: any,
  id: string | number,
  data: any,
) => {
  try {
    const response = await axiosConfig.put(
      `/manage/application/revise/${id}`,
      data,
      {
        headers: headers,
      },
    );
    return response.data ?? null;
  } catch (err: any) {
    // console.error("Failed to insert master data: ", err);
    return err?.response?.data;
  }
};

/**
 * Verify application
 * @param headers
 * @param data
 * @returns
 */
export const verifyApplication = async (headers: any, id: string | number) => {
  try {
    const response = await axiosConfig.post(
      `/manage/application/verify/${id}`,
      {},
      {
        headers: headers,
      },
    );
    return response.data ?? null;
  } catch (err: any) {
    // console.error("Failed to insert master data: ", err);
    return err?.response?.data;
  }
};

/**
 * Finalize application
 * @param headers
 * @param data
 * @returns
 */
export const finalizeApplication = async (
  headers: any,
  id: string | number,
) => {
  try {
    const response = await axiosConfig.post(
      `/manage/application/finalize/${id}`,
      {},
      {
        headers: headers,
      },
    );
    return response.data ?? null;
  } catch (err: any) {
    // console.error("Failed to insert master data: ", err);
    return err?.response?.data;
  }
};
