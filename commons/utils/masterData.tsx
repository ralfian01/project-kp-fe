import axiosConfig from "@/utils/axiosConfig";

// ## Master data
export const fetchMasterData = async (headers?: any, params?: any) => {
  try {
    const response = await axiosConfig.get("/manage/budgeting", {
      headers: headers,
      data: params,
    });

    return response.data?.data ?? null;
  } catch (err: any) {
    // console.error("Failed to fetch master data: ", err);
    return err?.response?.data ?? null;
  }
};

export const fetchMasterDataSummary = async (headers?: any) => {
  try {
    const response = await axiosConfig.get("/manage/budgeting/summary_active", {
      headers: headers,
    });

    return response.data?.data ?? null;
  } catch (err: any) {
    // console.error("Failed to fetch master data: ", err);
    return err?.response?.data;
  }
};

export const fetchMasterDataById = async (
  headers?: any,
  id?: string | number,
) => {
  try {
    const response = await axiosConfig.get(`/manage/budgeting/${id}`, {
      headers: headers,
    });
    return response.data?.data ?? null;
  } catch (err: any) {
    // console.error("Failed to fetch master data: ", err);
    return err?.response?.data;
  }
};

export const insertMasterData = async (headers: any, data: any) => {
  try {
    const response = await axiosConfig.post(`/manage/budgeting`, data, {
      headers: headers,
    });
    return response.data ?? null;
  } catch (err: any) {
    // console.error("Failed to insert master data: ", err);
    return err?.response?.data;
  }
};

export const updateMasterData = async (
  headers: any,
  id: string | number,
  data: any,
) => {
  try {
    const response = await axiosConfig.put(`/manage/budgeting/${id}`, data, {
      headers: headers,
    });
    return response.data ?? null;
  } catch (err: any) {
    // console.error("Failed to update master data: ", err);
    return err?.response?.data;
  }
};

// ## Master data allocation
export const fetchMasterDataAllocation = async (
  headers: any,
  id: string | number,
  params?: any,
) => {
  try {
    const response = await axiosConfig.get(
      `/manage/budgeting/${id}/allocation`,
      {
        headers: headers,
      },
    );

    return response.data?.data ?? null;
  } catch (err: any) {
    // console.error("Failed to fetch master data: ", err);
    return err?.response?.data;
  }
};

export const fetchMasterDataAllocationById = async (
  headers: any,
  budget_id: string | number,
  id: string | number,
) => {
  try {
    const response = await axiosConfig.get(
      `/manage/budgeting/${budget_id}/allocation/${id}`,
      {
        headers: headers,
      },
    );

    return response.data?.data ?? null;
  } catch (err: any) {
    // console.error("Failed to fetch master data: ", err);
    return err?.response?.data;
  }
};

export const insertMasterDataAllocation = async (
  headers: any,
  budget_id: string | number,
  data: any,
) => {
  try {
    const response = await axiosConfig.post(
      `/manage/budgeting/${budget_id}/allocation`,
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

export const updateMasterDataAllocation = async (
  headers: any,
  budget_id: string | number,
  id: string | number,
  data: any,
) => {
  try {
    const response = await axiosConfig.put(
      `/manage/budgeting/${budget_id}/allocation/${id}`,
      data,
      {
        headers: headers,
      },
    );
    return response.data ?? null;
  } catch (err: any) {
    // console.error("Failed to update master data: ", err);
    return err?.response?.data;
  }
};

export const deleteMasterDataAllocation = async (
  headers: any,
  budget_id: string | number,
  id: string | number,
) => {
  try {
    const response = await axiosConfig.delete(
      `/manage/budgeting/${budget_id}/allocation/${id}`,
      {
        headers: headers,
      },
    );
    return response.data ?? null;
  } catch (err: any) {
    // console.error("Failed to update master data: ", err);
    return err?.response?.data;
  }
};
