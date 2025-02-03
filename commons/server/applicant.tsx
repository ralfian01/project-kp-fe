import { fetchApplicant, fetchApplicantById } from "@/utils/applicant";
import { getAuthToken } from "./authToken";

export const getApplicant = async (type: string, params?: any) => {
  const { data: token } = await getAuthToken();
  let data = await fetchApplicant({ Authorization: token }, type, params);
  return { data };
};

export const getApplicantById = async (
  type: string,
  id: string | number,
  params?: any,
) => {
  const { data: token } = await getAuthToken();
  let data = await fetchApplicantById(
    { Authorization: token },
    type,
    id,
    params,
  );
  return { data };
};
