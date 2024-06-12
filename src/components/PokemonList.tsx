import {
  Box,
  Button,
  Flex,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import PokemonCard from './PokemonCard';
import { usePokemon } from '../hooks/usePokemon';

const PokemonList = ({ handleViewPokemon, handleNextPage }: any) => {
  const { pokemon, loading, error } = usePokemon();

  if (loading) return <Spinner />;
  if (error) return <Text color='red.500'>{error}</Text>;

  return (
    <Flex alignItems='center' minH='100vh' justifyContent='center'>
      <VStack spacing={4} align='stretch'>
        <SimpleGrid spacing='5' columns={{ base: 1, md: 5 }}>
          {pokemon.map((pokemon) => (
            <Box
              as='button'
              key={pokemon.id}
              onClick={() => handleViewPokemon(pokemon)}
            >
              <PokemonCard pokemon={pokemon} />
            </Box>
          ))}
        </SimpleGrid>

        <Button isLoading={false} onClick={handleNextPage}>
          Cargas más
        </Button>
      </VStack>
    </Flex>
  );
};

export default PokemonList;
