import { useEffect, useState } from "react";

export function useQuery(fetcher) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    let ignore = false;
    setStatus("loading");

    const fetchData = async () => {
      try {
        const response = await fetcher();
        if (!ignore) {
          setData(response.data);
        }
      } catch (error) {
        setStatus("error");
        setError(error.response?.data?.message || error.message);
      } finally {
        setStatus("success");
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, [fetcher]);

  return { data, error, status };
}
