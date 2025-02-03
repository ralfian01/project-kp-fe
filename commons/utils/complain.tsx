import axiosConfig from "@/utils/axiosConfig";

export const fetchComplain = async (headers: any, params?: any) => {
  try {
    const response = await axiosConfig.get(`/manage/complain`, {
      headers: headers,
      data: params ?? {},
    });

    return response.data?.data ?? null;
  } catch (err: any) {
    // console.error("Failed to fetch master data: ", err);
    return err?.response?.data;
  }
};

export const fetchComplainById = async (
  headers: any,
  id: string | number,
  params?: any,
) => {
  try {
    const response = await axiosConfig.get(`/manage/complain/${id}`, {
      headers: headers,
      data: params,
      params: params,
    });

    return response.data?.data ?? null;
  } catch (err: any) {
    // console.error("Failed to fetch master data: ", err);
    return err?.response?.data;
  }
};

export const fetchManageComplain = async (headers: any, params?: any) => {
  try {
    const response = await axiosConfig.get(`/manage/complain`, {
      headers: headers,
      data: params ?? {},
    });

    return response.data?.data ?? null;
  } catch (err: any) {
    // console.error("Failed to fetch master data: ", err);
    return err?.response?.data;
  }
};

export const fetchManageComplainById = async (
  headers: any,
  id: string | number,
  params?: any,
) => {
  try {
    const response = await axiosConfig.get(`/manage/complain/${id}`, {
      headers: headers,
      data: params,
      params: params,
    });

    return response.data?.data ?? null;
  } catch (err: any) {
    // console.error("Failed to fetch master data: ", err);
    return err?.response?.data;
  }
};

// ## Report
export const fetchComplainReport = async (headers: any, params?: any) => {
  try {
    const response = await axiosConfig.get(`/report/complain`, {
      headers: headers,
      data: params ?? {},
    });

    return response.data?.data ?? null;
  } catch (err: any) {
    // console.error("Failed to fetch master data: ", err);
    return err?.response?.data;
  }
};

export const fetchComplainReportById = async (
  headers: any,
  id: string | number,
  params?: any,
) => {
  try {
    const response = await axiosConfig.get(`/report/complain/${id}`, {
      headers: headers,
    });

    return response.data?.data ?? null;
  } catch (err: any) {
    // console.error("Failed to fetch master data: ", err);
    return err?.response?.data;
  }
};

export const insertComplain = async (headers: any, data: any) => {
  try {
    const response = await axiosConfig.post(`/manage/complain`, data, {
      headers: headers,
    });
    return response.data ?? null;
  } catch (err: any) {
    // console.error("Failed to insert master data: ", err);
    return err?.response?.data;
  }
};

export const updateComplain = async (
  headers: any,
  id: string | number,
  data: any,
) => {
  try {
    const response = await axiosConfig.put(`/manage/complain/${id}`, data, {
      headers: headers,
    });
    return response.data ?? null;
  } catch (err: any) {
    // console.error("Failed to update master data: ", err);
    return err?.response?.data;
  }
};

export const deleteComplain = async (headers: any, id: string | number) => {
  try {
    const response = await axiosConfig.delete(`/manage/complain/${id}`, {
      headers: headers,
    });
    return response.data ?? null;
  } catch (err: any) {
    // console.error("Failed to update master data: ", err);
    return err?.response?.data?.data ?? null;
  }
};
