import { RootObject } from '@/types';
import {
  Box,
  AspectRatio,
  Image,
  Stack,
  Progress,
  Text,
  Badge,
  HStack,
  Checkbox,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export default function PokemonData({
  selectedPokemon,
}: {
  selectedPokemon: RootObject;
}) {
  const [catched, setCatched] = useState(false);

  return (
    <Stack spacing='5' pb='5'>
      <Stack spacing='5' position='relative'>
        <Box position='absolute' right='0' zIndex='99'>
          <Checkbox>Catched</Checkbox>
        </Box>
        <AspectRatio w='full' ratio={1}>
          <Image
            alt='pokemon image'
            objectFit='contain'
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${selectedPokemon.id}.png`}
          />
        </AspectRatio>
        <Stack direction='row' spacing='5'>
          <Stack>
            <Text fontSize='sm'>Weight</Text>
            <Text>20</Text>
          </Stack>
          <Stack>
            <Text fontSize='sm'>Height</Text>
            <Text>12</Text>
          </Stack>
          <Stack>
            <Text fontSize='sm'>Movimientos</Text>
            <Text>109</Text>
          </Stack>
          <Stack>
            <Text fontSize='sm'>Tipos</Text>
            <HStack>
              <Badge>Agua</Badge>
              <Badge>Agua</Badge>
            </HStack>
          </Stack>
        </Stack>
      </Stack>

      <Stack spacing='5' p='5' bg='gray.100' borderRadius='xl'>
        <Stack>
          <Text fontSize='xs'>hp</Text>
          <Progress bg='gray.300' borderRadius='full' value={80} />
        </Stack>
        <Stack>
          <Text fontSize='xs'>attack</Text>
          <Progress bg='gray.300' borderRadius='full' value={65} />
        </Stack>
      </Stack>
    </Stack>
  );
}
