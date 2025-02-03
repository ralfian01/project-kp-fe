import axiosConfig from "@/utils/axiosConfig";

export const fetchStudentMajorLevel = async (headers?: any, params?: any) => {
  try {
    const response = await axiosConfig.get("/student_major_level", {
      headers: headers,
    });
    return response.data?.data ?? null;
  } catch (err: any) {
    // console.error("Failed to fetch master data: ", err);
    return err?.response?.data;
  }
};
