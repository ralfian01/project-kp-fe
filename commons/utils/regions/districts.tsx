import axiosConfig from "@/utils/axiosConfig";

export const fetchDistricts = async (params?: any) => {
  try {
    const response = await axiosConfig.get("/region/district", {
      params: params,
    });
    return response.data?.data ?? null;
  } catch (err: any) {
    // console.error("Failed to fetch master data: ", err);
    return err?.response?.data;
  }
};
