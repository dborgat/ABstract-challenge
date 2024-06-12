import { CatchedPokemons, PokemonInterface, RootObject } from '@/types';
import { useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';

interface CounterContextType {
  allPokemons: RootObject[];
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

const PokemonContext = createContext<CounterContextType | undefined>(undefined);

export const PokemonProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const toast = useToast();
  const pokemonDataModal = useDisclosure();

  const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

  const [allPokemons, setAllPokemons] = useState<RootObject[]>([]);
  const [fetchedPokemons, setFetchedPokemons] = useState<RootObject[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<RootObject>();
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [allPokemonsQuantity, setAllPokemonQuantity] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pokemonsCatched, setPokemonsCatched] = useState<CatchedPokemons[]>([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${BASE_URL}?offset=${pageNumber}&limit=20`
        );
        const promises = response.data.results.map(
          (pokemon: PokemonInterface) => axios(pokemon.url)
        );
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
    };
    fetchGlobalPokemons();
    fetchCatchedPokemons();
  }, []);

  const fetchCatchedPokemons = async () => {
    try {
      const { data } = await axios.get('api/catched');
      setPokemonsCatched(data);
    } catch (err) {
      setError('Failed to fetch Pokémon data');
    }
  };

  const addCatchedPokemon = async (pokemon: CatchedPokemons) => {
    try {
      await axios.post('api/catched', pokemon);
      toast({
        title: `You caught ${pokemon.name}!`,
        status: 'success',
        duration: 9000,
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
      const res = await axios.delete(`api/catched/${pokemonId}`);
      toast({
        title: `${res.data}`,
        status: 'success',
        duration: 9000,
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
        allPokemonsQuantity,
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
