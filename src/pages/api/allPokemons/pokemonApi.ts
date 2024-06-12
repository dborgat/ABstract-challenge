import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

export const fetchPokemons = async (currentPage: string) => {
    const { data } = await axios.get(currentPage);
    const promises = data.results.map((result: { url: string }) => axios(result.url));
    const fetchedPokemon = (await Promise.all(promises)).map((res) => res.data);
    return fetchedPokemon;
};