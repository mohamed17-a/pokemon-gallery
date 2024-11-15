import { useQuery } from "@tanstack/react-query";
import {
  getAllPokemons,
  getPokemonFlavorText,
  getSinglePokemon,
} from "../service/services";

export const useGetPokemons = (page: number, limit: number) => {
  const lastPokeIndexInPage = page * limit;
  const firstPokeIndexInPage = lastPokeIndexInPage - (limit - 1);
  const allResult = useQuery({
    queryKey: ["pokemons", page, limit],
    queryFn: () => getAllPokemons(page, limit),
  });

  const flavorTextResult = useQuery({
    queryKey: ["pokemonFlavor", page, limit],
    queryFn: async () => {
      const flavorTexts = await Promise.all(
        Array.from({ length: limit }).map(async (_, index) => {
          const pokemonId = firstPokeIndexInPage + index;
          const response = await getPokemonFlavorText(pokemonId);

          return (
            response.data?.flavor_text_entries.find(
              (entry: { language: { name: string; }; }) => entry.language.name === "en"
            )?.flavor_text || "No description available"
          );
        })
      );
      return flavorTexts;
    },
    enabled: !!allResult.data, // Only fetch if allResult data is available
  });

  const allDetailedData = useQuery({
    queryKey: ["singlePokemon", page, limit],
    queryFn: async () => {
      return Promise.all(
        allResult.data?.data?.results.map((item: { url: string }) =>
          getSinglePokemon(item.url)
        )
      );
    },
    enabled: !!allResult.data, 
  });

  return {
    ...allResult,
    flavorTexts: flavorTextResult.data || [],
    detailedData: allDetailedData.data?.map((data) => data.data) || [],
    allData: allResult.data?.data,
    isLoading: allResult.isLoading || flavorTextResult.isLoading || allDetailedData.isLoading,
    isError: allResult.isError || flavorTextResult.isError || allDetailedData.isError,
  };
};

export const useGetSinglePokemonDetails = (id:string)=>{
  const allSingleResult = useQuery({
    queryKey: ["pokemons", id],
    queryFn: () => getSinglePokemon(`https://pokeapi.co/api/v2/pokemon/${id}/`),
  });
  
  return {
    ...allSingleResult,
    singleData:allSingleResult?.data?.data,
    statsNames: allSingleResult?.data?.data?.stats.map((item: { stat: { name: string; }; })=>(item?.stat?.name)),
    statsBases:allSingleResult?.data?.data?.stats.map((item: { base_stat: string; })=>(item?.base_stat)),
    abilities: allSingleResult?.data?.data?.abilities.map((item: { ability: { name: string; }; })=>(item?.ability?.name)),
    moves:allSingleResult?.data?.data?.moves.map((item: { move: { name: string; }; })=>(item?.move?.name)),
    tags:allSingleResult?.data?.data?.types?.map(
      (element: { type: { name: string } }) => element?.type?.name
    ),
  }
}