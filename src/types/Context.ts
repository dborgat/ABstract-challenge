import { CatchedPokemons, RootObject } from "@/types/Pokemon";
import { useDisclosure } from "@chakra-ui/react";

export interface PokemonContextType {
    fetchedPokemons: RootObject[];
    loading: boolean;
    error: string | null;
    fetchMorePokemon: () => void;
    selectedPokemon: RootObject | undefined;
    setSelectedPokemon: React.Dispatch<
        React.SetStateAction<RootObject | undefined>
    >;
    pokemonDataModal: ReturnType<typeof useDisclosure>;
    allPokemonsQuantity: number;
    pokemonsCatched: CatchedPokemons[];
    setPokemonsCatched: React.Dispatch<React.SetStateAction<CatchedPokemons[]>>;
    addCatchedPokemon: (pokemon: CatchedPokemons) => void;
    deleteCatchedPokemon: (pokemonId: number) => void;
}