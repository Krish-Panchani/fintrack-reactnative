import useSWR from "swr";
import axios from "axios";
import { User } from "@/types/types";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

// useUser Hook to fetch the user data
export const useUserData = () => {
  const { data, error, isLoading } = useSWR<User>("/api/user", fetcher, {
    revalidateOnFocus: false, // Disable revalidation when tab refocuses
    dedupingInterval: 60000, // Deduplicate requests for 60 seconds
  });

  return {
    user: data,
    isLoading,
    isError: error,
  };
};
