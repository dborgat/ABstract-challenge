import { CatchedPokemons, RootObject } from '@/types';
import {
  Stack,
  Text,
  Image,
  HStack,
  Badge,
  AspectRatio,
  Box,
  Flex,
} from '@chakra-ui/react';
import { log } from 'console';

export default function PokemonCard({
  pokemon,
  catched,
}: {
  pokemon: RootObject;
  catched: CatchedPokemons[];
}) {
  const isCatched = (element: CatchedPokemons) => element.id === pokemon.id;

  return (
    <Stack
      spacing='5'
      boxShadow='xl'
      p='5'
      w='full'
      borderRadius='xl'
      alignItems='center'
      bgColor='gray.100'
    >
      {catched && catched.some(isCatched) && (
        <Flex alignItems='center'>
          <Text
            as='b'
            align='center'
            _firstLetter={{ textTransform: 'uppercase' }}
          >
            CATCHED!
          </Text>
          <Box p='4'>
            <Image boxSize='30px' src='/pokeball.svg' alt='Pokeball' />
          </Box>
        </Flex>
      )}
      <AspectRatio w='full' ratio={1}>
        <Image
          alt='pokemon image'
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
        />
      </AspectRatio>
      <Text as='b' align='center' _firstLetter={{ textTransform: 'uppercase' }}>
        {pokemon.name}
      </Text>

      <HStack>
        {pokemon?.types.map((type) => (
          <Badge
            size='xs'
            key={type.slot}
            bgColor='gray.300'
            borderRadius='xl'
            p='1'
          >
            {type.type.name}
          </Badge>
        ))}
      </HStack>
    </Stack>
  );
}
