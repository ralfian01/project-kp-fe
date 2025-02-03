import axiosConfig from "@/utils/axiosConfig";

export const fetchVillages = async (params?: any) => {
  try {
    const response = await axiosConfig.get("/region/village", {
      params: params,
    });
    return response.data?.data ?? null;
  } catch (err: any) {
    // console.error("Failed to fetch master data: ", err);
    return err?.response?.data;
  }
};
