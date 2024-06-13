import { Box, Button, Center, SimpleGrid, VStack } from '@chakra-ui/react';
import PokemonCard from './PokemonCard';
import { usePokemon } from '@/context/PokemonContext';
import PokemonModal from './PokemonModal';
import { Alert, AlertIcon } from '@chakra-ui/react';

const PokemonList = () => {
  const {
    allPokemonsQuantity,
    fetchedPokemons,
    loading,
    error,
    setSelectedPokemon,
    fetchMorePokemon,
    pokemonDataModal,
  } = usePokemon();

  if (error)
    return (
      <Alert status='error'>
        <AlertIcon />
        {error}
      </Alert>
    );

  return (
    <Box minH='100vh' paddingTop='40' paddingBottom='5'>
      <VStack spacing={4} align='stretch'>
        <SimpleGrid spacing='5' columns={[1, 2, 3, null, 5]}>
          {fetchedPokemons.map((pokemon) => (
            <Box
              as='button'
              key={pokemon.id}
              onClick={() => {
                setSelectedPokemon(pokemon), pokemonDataModal.onOpen();
              }}
            >
              <PokemonCard pokemon={pokemon} />
            </Box>
          ))}
        </SimpleGrid>
        <Button
          isLoading={loading}
          onClick={fetchMorePokemon}
          bgColor='tomato'
          color='white'
          isDisabled={allPokemonsQuantity === fetchedPokemons.length}
        >
          {allPokemonsQuantity === fetchedPokemons.length
            ? 'You have fetched all the Pokémon!'
            : `Get more Pokemons, fetched ${fetchedPokemons.length} of
        ${allPokemonsQuantity - fetchedPokemons.length} !`}
        </Button>
        <PokemonModal />
      </VStack>
    </Box>
  );
};

export default PokemonList;
