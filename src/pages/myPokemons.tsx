import React from 'react';
import PokemonCard from '@/components/PokemonCard';
import { usePokemon } from '@/context/PokemonContext';
import { Text, SimpleGrid, Stack, Button, Center } from '@chakra-ui/react';
import Link from 'next/link';

const MyPokemons = () => {
  const { pokemonsCatched, deleteCatchedPokemon } = usePokemon();

  if (pokemonsCatched.length === 0) {
    return (
      <Stack paddingX={[5, 10]} pt={40} minH='100vh' minW='100vw' spacing={5}>
        <Text fontSize={['2xl', '3xl']} as='b'>
          You haven&apos;t catch any Pokemon yet.
          <Link href='/'>
            <Button variant='solid' colorScheme='red'>
              Let&apos;s catch some Pokemons !
            </Button>
          </Link>
        </Text>
      </Stack>
    );
  }

  return (
    <Stack paddingX={[5, 10]} pt={40} minH='100vh' minW='100vw' spacing={5}>
      <Text fontSize={['2xl', '3xl']} as='b'>
        Let&apos;s see your Pokemons !
      </Text>

      <SimpleGrid spacing='5' columns={[1, 2, 3, 4]}>
        {pokemonsCatched.map((pokemon) => (
          <Stack key={pokemon.id} spacing={5}>
            <PokemonCard pokemon={pokemon} />
            <Center>
              <Button
                variant='solid'
                colorScheme='red'
                onClick={() => deleteCatchedPokemon(pokemon?.id)}
              >
                Release {pokemon.name.toUpperCase()}
              </Button>
            </Center>
          </Stack>
        ))}
      </SimpleGrid>
    </Stack>
  );
};

export default MyPokemons;
