import { useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { getPokemonList } from '@/services/pokemons';
import { PokemonContextType } from '@/types/Context';
import { CatchedPokemons, RootObject } from '@/types/Pokemon';

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export const PokemonProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const toast = useToast();
  const pokemonDataModal = useDisclosure();

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
        const pokemonList = await getPokemonList(pageNumber);
        setFetchedPokemons((prev) => [...prev, ...pokemonList]);
      } catch (err) {
        setError('Failed to fetch Pokémon data');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [pageNumber]);

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
