import { useState, useEffect } from 'react';
import axios from 'axios';
import { PokemonInterface, RootObject } from '@/types';
import { useDisclosure } from '@chakra-ui/react';

export const usePokemon = () => {
    const pokemonDataModal = useDisclosure();

    const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

    const [allPokemons, setAllPokemons] = useState<RootObject[]>([]);
    const [selectedPokemon, setSelectedPokemon] = useState<RootObject>();
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [AllPokemonsQuantity, setAllPokemonQuantity] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchMorePokemon = () => {
        setPageNumber((prev) => prev + 20);
    };

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${BASE_URL}?offset=${pageNumber}&limit=20`);
                const promises = response.data.results.map((pokemon: PokemonInterface) => axios(pokemon.url));
                const fetchedPokemon = (await Promise.all(promises)).map(
                    (res) => res.data
                );
                pageNumber === 0 && setAllPokemonQuantity(response.data.count);
                setAllPokemons((prev) => [...prev, ...fetchedPokemon]);
            } catch (err) {
                setError('Failed to fetch Pokémon data');
            } finally {
                setLoading(false);
            }
        };

        fetchPokemon();
    }, [pageNumber]);


    return { allPokemons, loading, error, fetchMorePokemon, selectedPokemon, setSelectedPokemon, pokemonDataModal, AllPokemonsQuantity };
};
