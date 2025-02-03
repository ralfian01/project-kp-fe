import { fetchMasterDataCategory } from "@/utils/masterDataCategory";
import { useEffect, useState } from "react";
import useAuthToken from "./useAuthToken";

export const useMasterDataCategory = (params?: any) => {
  const [data, setData] = useState<any>(null);
  const { data: token } = useAuthToken();

  useEffect(() => {
    const fetchData = async () => {
      const masterDataCategory = await fetchMasterDataCategory(
        { Authorization: token },
        params,
      );
      setData(masterDataCategory);
    };

    fetchData();
  }, []);

  return { data };
};
