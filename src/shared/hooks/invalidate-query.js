import { useQueryClient } from "@tanstack/react-query";

export const useInvalidateQuery = () => {
  const queryClient = useQueryClient();
  const invalidateQuery = async (dependencyKey) => {
    return await queryClient.invalidateQueries({ queryKey: [dependencyKey] });
  };

  return {
    invalidateQuery,
  };
};
