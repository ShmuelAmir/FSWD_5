import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export function useQuery(url, disabled) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [refetchFlag, setRefetchFlag] = useState(false);

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);

    const fetchData = async () => {
      try {
        if (disabled) return;
        const response = await axiosInstance.get(url);
        if (!ignore) {
          const total = response.headers["x-total-count"];
          if (total) {
            setData({
              items: response.data,
              total: parseInt(total, 10),
            });
          } else {
            setData(response.data);
          }
        }
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, [url, disabled, refetchFlag]);

  const refetch = () => {
    setRefetchFlag((p) => !p);
  };

  return { data, isLoading, error, refetch };
}
