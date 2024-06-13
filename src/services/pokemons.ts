import { CatchedPokemons, PokemonInterface } from "@/types/Pokemon";
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

export const getAllPokemons = async () => {
    const response = await axios.get(`${BASE_URL}?limit=100000`);
    return response.data;
}

export const getPokemon = async (id: number) => {
    const response = await axios.get(`${BASE_URL}${id}`);
    return response.data;
};

export const getCatchedPokemons = async () => {
    const response = await axios.get('api/catched');
    return response.data;
};

export const catchPokemon = async (pokemon: CatchedPokemons) => {
    const response = await axios.post('api/catched', pokemon);
    return response.data;
};

export const releasePokemon = async (id: number) => {
    const response = await axios.delete(`api/catched/${id}`);
    return response.data;
};


