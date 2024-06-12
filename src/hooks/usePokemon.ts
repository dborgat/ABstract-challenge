// hooks/usePokemon.ts
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Pokemon {
    name: string;
}

export const usePokemon = () => {
    const [pokemon, setPokemon] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchPokemon();
    }, []);

    const fetchPokemon = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0');
            const promises = response.data.results.map((pokemon: any) => axios(pokemon.url));
            const fetchedPokemon = (await Promise.all(promises)).map(
                (res) => res.data
            );

            console.log(fetchedPokemon, '------')
            setPokemon((prev) => [...prev, ...fetchedPokemon]);
        } catch (err) {
            setError('Failed to fetch Pokémon data');
        } finally {
            setLoading(false);
        }
    };

    const fetchMorePokemon = async () => {
        // Implementar la lógica para obtener más Pokémon aquí
    };

    return { pokemon, loading, error, fetchMorePokemon };
};
