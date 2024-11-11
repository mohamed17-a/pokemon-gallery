/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@tanstack/react-query";
import { getAllPokemons, getSinglePokemon } from "../service/services";

export const useGetPokemons = (page: number, limit: number) => {
  // Fetch the list of all Pokemons
  const allResult = useQuery({
    queryKey: ["pokemons", page, limit],
    queryFn: () => getAllPokemons(page, limit),
  });

  // Fetch details for each Pokemon in the list, only if allResult data is available
  const allDetailedData = useQuery({
    queryKey: ["singlePokemon", page, limit],
    queryFn: async () => {
      return Promise.all(
        allResult.data?.data?.results.map((item: { url: string }) =>
          getSinglePokemon(item.url)
        )
      );
    },
    enabled: !!allResult.data, // Only run if allResult data is available
  });

  return {
    ...allResult,
    detailedData: allDetailedData.data?.map((data) => data.data), // Array of detailed data
    allData: allResult.data?.data,
  };
};
