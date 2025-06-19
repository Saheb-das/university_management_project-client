// external import
import { useQuery } from "@tanstack/react-query";

// internal import
import { getAllCollages } from "@/api/services/auth";

export const useCollages = () => {
  return useQuery({
    queryKey: ["auth-collages"],
    queryFn: getAllCollages,
  });
};
