import axiosConfig from "@/utils/axiosConfig";

// ## Login
export const fetchLogin = async (headers?: any, data?: any) => {
  try {
    const response = await axiosConfig.post("/auth/account", data, {
      headers: headers,
    });

    return response.data ?? null;
  } catch (err: any) {
    // console.error("Failed to fetch master data: ", err);
    return err?.response?.data;
  }
};

// ## Register
export const fetchRegisterAccount = async (data?: any) => {
  try {
    const response = await axiosConfig.post("/register/account", data);

    return response.data ?? null;
  } catch (err: any) {
    // console.error("Failed to fetch master data: ", err);
    return err?.response?.data;
  }
};
