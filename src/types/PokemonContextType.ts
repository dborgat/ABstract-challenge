import { Dispatch, SetStateAction } from "react";
import { CatchedPokemons, PokemonApiResponse } from "@/types/Pokemon";
import { useDisclosure } from "@chakra-ui/react";

export interface PokemonContextType {
    allPokemonsQuantity: number;
    fetchedPokemons: PokemonApiResponse[];
    loading: boolean;
    error: string | undefined;
    selectedPokemon: PokemonApiResponse;
    setSelectedPokemon: Dispatch<
        SetStateAction<PokemonApiResponse>
    >;
    pokemonDataModal: ReturnType<typeof useDisclosure>;
    pokemonsCatched: CatchedPokemons[];
    setPokemonsCatched: Dispatch<SetStateAction<CatchedPokemons[]>>;
    fetchMorePokemon: () => void;
    addCatchedPokemon: (pokemon: CatchedPokemons) => void;
    deleteCatchedPokemon: (pokemonId: number) => void;
}