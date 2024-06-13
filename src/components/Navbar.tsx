import React from 'react';
import { Flex, Spacer, Image, Text, Center } from '@chakra-ui/react';
import { usePokemon } from '@/context/PokemonContext';

const Navbar = () => {
  const { pokemonsCatched } = usePokemon();
  return (
    <Flex
      as='nav'
      bg='tomato'
      w='100%'
      p={4}
      position='fixed'
      top='0'
      width='100%'
      zIndex='1'
    >
      <Center p='4'>
        <Image boxSize={[30, 25, 10]} src='/pokeball.svg' alt='Pokeball' />
      </Center>
      <Spacer />
      <Center p='4'>
        <Text fontSize={[18, 25]} color='white' as='b'>
          {pokemonsCatched.length === 0
            ? 'Please catch some Pokemons !'
            : `You have catched ${pokemonsCatched.length} Pokemons !`}
        </Text>
      </Center>
    </Flex>
  );
};

export default Navbar;
