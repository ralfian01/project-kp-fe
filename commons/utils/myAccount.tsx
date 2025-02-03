import axiosConfig from "@/utils/axiosConfig";

export const fetchMyAccount = async (headers?: any, params?: any) => {
  try {
    const response = await axiosConfig.get("/my", {
      headers: headers,
    });

    return response.data?.data ?? null;
  } catch (err: any) {
    // console.error("Failed to fetch account data: ", err);
    return err?.response?.data;
  }
};

export const fetchMyAccountPrivileges = async (headers?: any) => {
  try {
    const response = await axiosConfig.get("/my/privileges", {
      headers: headers,
    });

    return response.data?.data ?? null;
  } catch (err: any) {
    // console.error("Failed to fetch account privileges: ", err);
    return err?.response?.data;
  }
};

export const fetchMyApplication = async (headers?: any) => {
  try {
    const response = await axiosConfig.get("/my/application", {
      headers: headers,
    });

    return response.data?.data ?? null;
  } catch (err: any) {
    // console.error("Failed to fetch account application: ", err);
    return err?.response?.data;
  }
};

export const updateMyApplicationDraft = async (headers?: any, data?: any) => {
  try {
    const response = await axiosConfig.put("/my/application", data, {
      headers: headers,
    });

    return response.data ?? null;
  } catch (err: any) {
    // console.error("Failed to fetch account application: ", err);
    return err?.response?.data;
  }
};

export const proposeMyApplication = async (headers?: any) => {
  try {
    const response = await axiosConfig.put("/my/application/propose", null, {
      headers: headers,
    });

    return response.data ?? null;
  } catch (err: any) {
    // console.error("Failed to fetch account application: ", err);
    return err?.response?.data;
  }
};
