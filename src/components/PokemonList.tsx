import { Box, Button, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import PokemonCard from './PokemonCard';
import { usePokemon } from '../hooks/usePokemon';
import PokemonModal from './PokemonModal';
import { useDisclosure } from '@chakra-ui/react';

const PokemonList = () => {
  const pokemonDataModal = useDisclosure();

  const {
    fetchedPokemons,
    loading,
    error,
    setSelectedPokemon,
    fetchMorePokemon,
    selectedPokemon,
    allPokemonsQuantity,
    catched,
    addCatchedPokemon,
    deleteCatchedPokemon,
  } = usePokemon();

  if (error) return <Text color='red.500'>{error}</Text>;
  return (
    <VStack
      spacing={4}
      align='stretch'
      minH='100vh'
      paddingBottom='5'
      paddingTop='40'
    >
      <SimpleGrid spacing='5' columns={{ base: 1, md: 5 }}>
        {fetchedPokemons.map((pokemon) => (
          <Box
            as='button'
            key={pokemon.id}
            onClick={() => {
              setSelectedPokemon(pokemon), pokemonDataModal.onOpen();
            }}
          >
            <PokemonCard pokemon={pokemon} catched={catched} />
          </Box>
        ))}
      </SimpleGrid>
      <Button
        isLoading={loading}
        onClick={fetchMorePokemon}
        isDisabled={allPokemonsQuantity === fetchedPokemons.length}
      >
        {allPokemonsQuantity === fetchedPokemons.length
          ? 'Ya cargaste todos los Pokemons'
          : `Cargas más Pokémon, vas ${fetchedPokemons.length} quedan
        ${allPokemonsQuantity - fetchedPokemons.length} !`}
      </Button>
      <PokemonModal
        pokemonDataModal={pokemonDataModal}
        selectedPokemon={selectedPokemon}
        catched={catched}
        addCatchedPokemon={addCatchedPokemon}
        deleteCatchedPokemon={deleteCatchedPokemon}
      />
    </VStack>
  );
};

export default PokemonList;
