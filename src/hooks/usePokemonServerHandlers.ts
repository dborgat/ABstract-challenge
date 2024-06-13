import { Dispatch, SetStateAction } from "react";
import { catchPokemon, getCatchedPokemons, releasePokemon } from "@/services/pokemons";
import { CatchedPokemons } from "@/types/Pokemon";
import { useToast } from "@chakra-ui/react";
import type { AxiosError } from "axios";
import { axiosErrorHandler } from "@/utils/axiosErrorHandler";


export const usePokemonServerHandlers = ({
    setPokemonsCatched,
    setError,
}: {
    setPokemonsCatched: Dispatch<SetStateAction<CatchedPokemons[]>>;
    setError: Dispatch<SetStateAction<string | undefined>>;

}) => {
    const toast = useToast();


    const fetchCatchedPokemons = async () => {
        try {
            const data = await getCatchedPokemons();
            setPokemonsCatched(data);
        } catch (err) {
            const error = axiosErrorHandler(err as AxiosError);
            setError(error);
        };

    }

    const addCatchedPokemon = async (pokemon: CatchedPokemons) => {
        try {
            const data = await catchPokemon(pokemon);
            toast({
                title: `You caught ${data.name}!`,
                status: 'success',
                duration: 1000,
                isClosable: true,
            });
            fetchCatchedPokemons();
        } catch (err) {
            const error = axiosErrorHandler(err as AxiosError);
            setError(error);
        }
    };

    const deleteCatchedPokemon = async (pokemonId: number) => {
        try {
            const data = await releasePokemon(pokemonId);
            toast({
                title: `${data}`,
                status: 'success',
                duration: 1000,
                isClosable: true,
            });
            fetchCatchedPokemons();
        } catch (err) {
            const error = axiosErrorHandler(err as AxiosError);
            setError(error);
        }
    };


    return {
        deleteCatchedPokemon,
        addCatchedPokemon,
        fetchCatchedPokemons,
    }
}