import { useEffect, useState } from "react";

export function useQuery(fetcher) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const response = await fetcher();
        if (!ignore) {
          setData(response.data);
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
  }, [fetcher]);

  return { data, isLoading, error };
}
