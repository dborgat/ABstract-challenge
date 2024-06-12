import { CatchedPokemons, RootObject } from '@/types';
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

export default function PokemonData({
  selectedPokemon,
  catched,
  addCatchedPokemon,
  deleteCatchedPokemon,
}: {
  selectedPokemon: RootObject;
  catched: CatchedPokemons[];
  addCatchedPokemon: (pokemon: CatchedPokemons) => void;
  deleteCatchedPokemon: (pokemonId: number) => void;
}) {
  const infoRequired = ['weight', 'height'] as const;
  const isCatched = (element: CatchedPokemons) =>
    element.id === selectedPokemon.id;
  const isCatchedPokemon = catched.some(isCatched);

  return (
    <Stack spacing='5' pb='5'>
      <Stack spacing='5' position='relative'>
        <Box position='absolute' right='0' zIndex='99'>
          <Checkbox
            as='b'
            isChecked={isCatchedPokemon}
            onChange={() => {
              isCatchedPokemon
                ? deleteCatchedPokemon(selectedPokemon.id)
                : addCatchedPokemon({
                    id: selectedPokemon.id,
                    name: selectedPokemon.name,
                  });
            }}
          >
            Catched
          </Checkbox>
        </Box>
        <AspectRatio w='full' ratio={1}>
          <Image
            alt='pokemon image'
            objectFit='contain'
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${selectedPokemon.id}.png`}
          />
        </AspectRatio>
        <Stack direction='row' justifyContent='space-between'>
          {infoRequired.map((info, index) => (
            <Stack key={index} alignItems='center'>
              <Text
                fontSize='sm'
                as='b'
                _firstLetter={{ textTransform: 'uppercase' }}
              >
                {info}
              </Text>
              <Text as='b'>{selectedPokemon[info]}</Text>
            </Stack>
          ))}

          <Stack alignItems='center'>
            <Text fontSize='sm' as='b'>
              Movimientos
            </Text>
            <Text as='b'>{selectedPokemon?.moves?.length}</Text>
          </Stack>
          <Stack>
            <Text fontSize='sm' as='b'>
              Tipos
            </Text>
            <HStack>
              {selectedPokemon?.types?.map((type) => (
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
        </Stack>
      </Stack>

      <Stack spacing='5' p='5' bg='gray.100' borderRadius='xl'>
        {selectedPokemon?.stats?.map((stat) => (
          <Stack key={stat.stat.url}>
            <Text
              fontSize='xs'
              as='b'
              _firstLetter={{ textTransform: 'uppercase' }}
            >
              {stat.stat.name}
            </Text>
            <Progress
              bg='gray.300'
              borderRadius='full'
              value={stat.base_stat}
            />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
