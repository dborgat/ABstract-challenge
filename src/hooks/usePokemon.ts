import { useState, useEffect } from 'react';
import axios, { all } from 'axios';
import { PokemonInterface, RootObject, CatchedPokemons } from '@/types';
import { useDisclosure } from '@chakra-ui/react';

export const usePokemon = () => {
    const pokemonDataModal = useDisclosure();

    const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

    const [allPokemons, setAllPokemons] = useState<RootObject[]>([]);
    const [fetchedPokemons, setFetchedPokemons] = useState<RootObject[]>([]);
    const [selectedPokemon, setSelectedPokemon] = useState<RootObject>();
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [allPokemonsQuantity, setAllPokemonQuantity] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [catched, setCatched] = useState(false);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${BASE_URL}?offset=${pageNumber}&limit=20`);
                const promises = response.data.results.map((pokemon: PokemonInterface) => axios(pokemon.url));
                const fetchedPokemon = (await Promise.all(promises)).map(
                    (res) => res.data
                );
                setFetchedPokemons((prev) => [...prev, ...fetchedPokemon]);
            } catch (err) {
                setError('Failed to fetch Pokémon data');
            } finally {
                setLoading(false);
            }
        };

        fetchPokemon();
    }, [pageNumber]);

    useEffect(() => {
        const fetchGlobalPokemons = async () => {
            try {
                const { data } = await axios.get(`${BASE_URL}?limit=100000`);
                setAllPokemons(data.results);
                setAllPokemonQuantity(data.count);
            } catch (err) {
                setError('Failed to fetch Pokémon data');
            }
        }
        fetchGlobalPokemons();
        fetchCatchedPokemons();
    }, []);

    const fetchCatchedPokemons = async () => {
        try {
            const { data } = await axios.get('api/catched');
            setCatched(data);
        } catch (err) {
            setError('Failed to fetch Pokémon data');
        }
    }

    const addCatchedPokemon = async (pokemon: CatchedPokemons) => {
        try {
            await axios.post('api/catched', pokemon);
            fetchCatchedPokemons()
        } catch (err) {
            setError('Failed to fetch Pokémon data');
        }
    }

    const deleteCatchedPokemon = async (pokemonId: number) => {
        try {
            await axios.delete(`api/catched/${pokemonId}`);
            fetchCatchedPokemons()
        } catch (err) {
            setError('Failed to fetch Pokémon data');
        }
    }

    const fetchMorePokemon = () => {
        setPageNumber((prev) => prev + 20);
    };

    return { allPokemons, fetchedPokemons, loading, error, fetchMorePokemon, selectedPokemon, setSelectedPokemon, pokemonDataModal, allPokemonsQuantity, catched, setCatched, addCatchedPokemon, deleteCatchedPokemon };
};
