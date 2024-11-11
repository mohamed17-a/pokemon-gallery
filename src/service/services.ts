import axios from "axios";
const baseUrl = 'https://pokeapi.co/api/v2/pokemon'

export async function getAllPokemons(page:number,limit:number){
    return (await axios.get(`${baseUrl}?offset=${(page-1)*6}&limit=${limit}`));
}

export async function getSinglePokemon(url:string){
    return (await axios.get(`${url}`));
}