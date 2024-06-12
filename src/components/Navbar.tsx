import React from 'react';
import { Box, Flex, Spacer, Image, Text } from '@chakra-ui/react';
import { usePokemon } from '@/hooks/usePokemon';

const Navbar = () => {
  const { pokemonsCatched } = usePokemon();
  return (
    <Flex
      as='nav'
      bg='tomato'
      w='100%'
      p={4}
      color='white'
      position='fixed'
      top='0'
      width='100%'
      zIndex='1'
    >
      <Box p='4'>
        <Image boxSize='30px' src='/pokeball.svg' alt='Pokeball' />
      </Box>
      <Spacer />
      <Box p='4'>
        <Text fontSize='20px' color='white'>
          Tenes {pokemonsCatched.length} Pokemons !
        </Text>
      </Box>
    </Flex>
  );
};

export default Navbar;
