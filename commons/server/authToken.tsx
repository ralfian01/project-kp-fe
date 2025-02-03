import { cookies } from "next/headers";

export const getAuthToken = async () => {
    const token = cookies().get("_auth.token")?.value || null;

    return {data: token};
}