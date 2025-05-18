import { useLocalStorage } from "./useLocalstorage";

export function useAuth() {
  return useLocalStorage("user");
}
