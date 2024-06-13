import { CatchedPokemons, PokemonApiResponse } from '@/types/Pokemon';
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
import { usePokemon } from '@/context/PokemonContext';
import { IMAGE_URL } from '@/utils/constants';

export default function PokemonCard({
  pokemon,
}: {
  pokemon: PokemonApiResponse;
}) {
  const { pokemonsCatched } = usePokemon();

  const isCatched = (element: CatchedPokemons) => element.id === pokemon.id;

  return (
    <Stack
      spacing='5'
      boxShadow='xl'
      p='5'
      w='full'
      borderRadius='xl'
      alignItems='center'
      bgColor={pokemonsCatched.some(isCatched) ? 'red.200' : 'gray.100'}
    >
      {pokemonsCatched.some(isCatched) && (
        <Flex alignItems='center'>
          <Text
            as='b'
            align='center'
            _firstLetter={{ textTransform: 'uppercase' }}
          >
            CATCHED!
          </Text>
          <Box paddingX={4}>
            <Image boxSize='30px' src='/pokeball.svg' alt='Pokeball' />
          </Box>
        </Flex>
      )}
      <AspectRatio w='full' ratio={1}>
        <Image alt='pokemon image' src={`${IMAGE_URL}/${pokemon.id}.png`} />
      </AspectRatio>
      <Text as='b' align='center' _firstLetter={{ textTransform: 'uppercase' }}>
        {pokemon.name}
      </Text>

      <HStack>
        {pokemon?.types.map((type) => (
          <Badge
            size='xs'
            key={type.slot}
            bgColor={pokemonsCatched.some(isCatched) ? 'red.600' : 'gray.300'}
            color={pokemonsCatched.some(isCatched) ? 'white' : 'black'}
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
