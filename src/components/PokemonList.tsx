import { Box, Button, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import PokemonCard from './PokemonCard';
import { usePokemon } from '@/context/PokemonContext';
import PokemonModal from './PokemonModal';
import { Alert, AlertIcon } from '@chakra-ui/react';

const PokemonList = () => {
  const {
    allPokemons,
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
    <VStack
      spacing={4}
      align='stretch'
      minH='100vh'
      paddingBottom='5'
      paddingTop='40'
    >
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
        isDisabled={allPokemons.length === fetchedPokemons.length}
      >
        {allPokemons.length === fetchedPokemons.length
          ? 'You have fetched all the Pokémon!'
          : `Get more Pokemons, fetched ${fetchedPokemons.length} of
        ${allPokemons.length - fetchedPokemons.length} !`}
      </Button>
      <PokemonModal />
    </VStack>
  );
};

export default PokemonList;
