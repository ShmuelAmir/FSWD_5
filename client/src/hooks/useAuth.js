import { useLocalStorage } from "./useLocalstorage";
import { useQuery } from "./useQuery";

export function useAuth() {
  const [userId, setUserId] = useLocalStorage("user");

  const userQuery = useQuery(`users/${userId}`, !userId);

  return { userId, setUserId, userQuery };
}
