import axiosConfig from "@/utils/axiosConfig";

export const fetchManageProduct = async (headers: any, params?: any) => {
  try {
    const response = await axiosConfig.get(`/manage/product`, {
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

export const fetchManageProductById = async (
  headers: any,
  id: string | number,
  params?: any,
) => {
  try {
    const response = await axiosConfig.get(`/manage/product/${id}`, {
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
 * Create product
 * @param headers
 * @param data
 * @returns
 */
export const insertProduct = async (headers: any, data: any) => {
  try {
    const response = await axiosConfig.post(`/manage/product`, data, {
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
export const updateProduct = async (
  headers: any,
  id: string | number,
  data: any,
) => {
  try {
    const response = await axiosConfig.put(`/manage/product/${id}`, data, {
      headers: headers,
    });
    return response.data ?? null;
  } catch (err: any) {
    // console.error("Failed to insert master data: ", err);
    return err?.response?.data?.data ?? null;
  }
};

export const deleteProduct = async (headers: any, id: string | number) => {
  try {
    const response = await axiosConfig.delete(`/manage/product/${id}`, {
      headers: headers,
    });
    return response.data ?? null;
  } catch (err: any) {
    // console.error("Failed to update master data: ", err);
    return err?.response?.data?.data ?? null;
  }
};
