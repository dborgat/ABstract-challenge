import { PokemonInterface } from "@/types/Pokemon";
import { BASE_URL } from "@/utils/constants";
import axios from "axios";

export const getPokemonList = async (pageNumber: number) => {
    const response = await axios.get(
        `${BASE_URL}?offset=${pageNumber}&limit=20`
    );
    const promises = response.data.results.map(
        (pokemon: PokemonInterface) => axios(pokemon.url)
    );
    const fetchedPokemon = (await Promise.all(promises)).map(
        (res) => res.data
    );

    return fetchedPokemon;
};