import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { getPokemonList } from '@/services/pokemons';
import { PokemonContextType } from '@/types/PokemonContextType';
import { CatchedPokemons, PokemonApiResponse } from '@/types/Pokemon';
import { DEFAULT_SELECTED_POKEMON } from '@/utils/constants';
import { usePokemonServerHandlers } from '@/hooks/usePokemonServerHandlers';

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export const PokemonProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pokemonDataModal = useDisclosure();

  const [allPokemonsQuantity, setAllPokemonsQuantity] = useState<number>(0);
  const [fetchedPokemons, setFetchedPokemons] = useState<PokemonApiResponse[]>(
    []
  );
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonApiResponse>(
    DEFAULT_SELECTED_POKEMON
  );
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>('');
  const [pokemonsCatched, setPokemonsCatched] = useState<CatchedPokemons[]>([]);

  const { addCatchedPokemon, deleteCatchedPokemon, fetchCatchedPokemons } =
    usePokemonServerHandlers({
      setPokemonsCatched,
      setError,
    });

  const pokemonList = useCallback(async () => {
    try {
      setLoading(true);
      const { fetchedPokemon, count } = await getPokemonList(pageNumber);

      setFetchedPokemons((prev) => [...prev, ...fetchedPokemon]);

      setAllPokemonsQuantity(count);
    } catch (err) {
      setError('Failed to fetch Pokémon data');
    } finally {
      setLoading(false);
    }
  }, [pageNumber]);

  useEffect(() => {
    pokemonList();
  }, [pokemonList]);

  useEffect(() => {
    fetchCatchedPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMorePokemon = () => {
    setPageNumber((prev) => prev + 20);
  };

  return (
    <PokemonContext.Provider
      value={{
        allPokemonsQuantity,
        fetchedPokemons,
        loading,
        error,
        fetchMorePokemon,
        selectedPokemon,
        setSelectedPokemon,
        pokemonDataModal,
        pokemonsCatched,
        setPokemonsCatched,
        addCatchedPokemon,
        deleteCatchedPokemon,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemon = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('usePokemon must be used within a PokemonProvider');
  }
  return context;
};
