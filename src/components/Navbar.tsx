import React from 'react';
import { Box, Flex, Spacer, Image } from '@chakra-ui/react';

const Navbar = () => {
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
        <Image
          boxSize='30px'
          src='/pokeball.svg'
          alt='Pokeball'
        />
      </Box>
      <Spacer />
      <Box p='4' bg='green.400'>
        Box 2
      </Box>
    </Flex>
  );
};

export default Navbar;
