import axios from "axios";
const baseUrl = 'https://pokeapi.co/api/v2'

export async function getAllPokemons(page:number,limit:number){
    return (await axios.get(`${baseUrl}/pokemon?offset=${(page-1)*6}&limit=${limit}`));
}

export async function getSinglePokemon(url:string){
    return (await axios.get(`${url}`));
}
export async function getPokemonFlavorText(index:number){
    return (await axios.get(`${baseUrl}/pokemon-species/${index}/`));
}