import { RootObject } from '@/types';
import {
  Stack,
  Text,
  Image,
  HStack,
  Badge,
  AspectRatio,
} from '@chakra-ui/react';

export default function PokemonCard({ pokemon }: { pokemon: RootObject }) {
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
