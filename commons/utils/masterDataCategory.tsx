import axiosConfig from "@/utils/axiosConfig";

export const fetchMasterDataCategory = async (headers?: any, params?: any) => {
  try {
    const response = await axiosConfig.get("/manage/budgeting_category", {
      headers: headers,
    });
    return response.data?.data ?? null;
  } catch (err) {
    console.error("Failed to fetch master data: ", err);
    return null;
  }
};
