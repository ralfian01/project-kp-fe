import { fetchStudentMajorLevel } from "@/utils/studentMajorLevel";

export const getStudentMajorLevel = async (params?: any) => {
  let data = await fetchStudentMajorLevel({}, params);
  return { data };
};
