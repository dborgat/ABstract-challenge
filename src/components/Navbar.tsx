import React from 'react';
import { Flex, Spacer, Image, Text, Center } from '@chakra-ui/react';
import { usePokemon } from '@/context/PokemonContext';
import { FaArrowRight } from 'react-icons/fa6';
import Link from 'next/link';

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
        <Link href='/'>
          <Image boxSize={[30, 25, 10]} src='/pokeball.svg' alt='Pokeball' />
        </Link>
      </Center>
      <Spacer />
      <Center p='4'>
        <Text fontSize='xl' color='white' as='b'>
          {pokemonsCatched.length === 0 ? (
            'Please catch some Pokemons !'
          ) : (
            <Link href='/myPokemons'>
              <Flex alignItems='center' gap='5'>
                <FaArrowRight />
                <Text>You&apos;ve catched {pokemonsCatched.length}!</Text>
              </Flex>
            </Link>
          )}
        </Text>
      </Center>
    </Flex>
  );
};

export default Navbar;
