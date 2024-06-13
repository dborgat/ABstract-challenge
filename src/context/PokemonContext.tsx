import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useDisclosure, useToast } from '@chakra-ui/react';
import {
  catchPokemon,
  getAllPokemons,
  getCatchedPokemons,
  getPokemonList,
  releasePokemon,
} from '@/services/pokemons';
import { PokemonContextType } from '@/types/PokemonContextType';
import {
  CatchedPokemons,
  PokemonInterface,
  PokemonApiResponse,
} from '@/types/Pokemon';

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export const PokemonProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const toast = useToast();
  const pokemonDataModal = useDisclosure();

  const [allPokemons, setAllPokemons] = useState<PokemonInterface[]>([]);
  const [fetchedPokemons, setFetchedPokemons] = useState<PokemonApiResponse[]>(
    []
  );
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonApiResponse>({
    id: 0,
    name: '',
    types: [],
    height: 0,
    weight: 0,
    stats: [],
    moves: [],
  });

  const [pageNumber, setPageNumber] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pokemonsCatched, setPokemonsCatched] = useState<CatchedPokemons[]>([]);

  const pokemonList = useCallback(async () => {
    try {
      setLoading(true);
      const pokemonList = await getPokemonList(pageNumber);
      setFetchedPokemons((prev) => [...prev, ...pokemonList]);
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
    const fetchGlobalPokemons = async () => {
      try {
        const data = await getAllPokemons();
        setAllPokemons(data.results);
      } catch (err) {
        setError('Failed to fetch Pokémon data');
      }
    };
    fetchGlobalPokemons();
    fetchCatchedPokemons();
  }, []);

  const fetchCatchedPokemons = async () => {
    try {
      const data = await getCatchedPokemons();
      setPokemonsCatched(data);
    } catch (err) {
      setError('Failed to fetch Pokémon data');
    }
  };

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
      setError('Failed to fetch Pokémon data');
    } finally {
      pokemonDataModal.onClose();
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
      setError('Failed to fetch Pokémon data');
    } finally {
      pokemonDataModal.onClose();
    }
  };

  const fetchMorePokemon = () => {
    setPageNumber((prev) => prev + 20);
  };

  return (
    <PokemonContext.Provider
      value={{
        allPokemons,
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
