import { usePokemon } from '@/context/PokemonContext';
import { CatchedPokemons, PokeType, Stat } from '@/types/Pokemon';
import { IMAGE_URL, infoRequired } from '@/utils/constants';
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

export default function PokemonData() {
  const {
    selectedPokemon,
    pokemonsCatched,
    addCatchedPokemon,
    deleteCatchedPokemon,
  } = usePokemon();

  const isCatched = (element: CatchedPokemons) =>
    element.id === selectedPokemon?.id;
  const isCatchedPokemon = pokemonsCatched.some(isCatched);

  return (
    <Stack spacing={['5', '10']} pb='5' direction={['column', 'row']}>
      <Stack spacing='5'>
        <Box>
          <Checkbox
            as='b'
            isChecked={isCatchedPokemon}
            onChange={() => {
              isCatchedPokemon
                ? deleteCatchedPokemon(selectedPokemon?.id)
                : addCatchedPokemon({
                    id: selectedPokemon?.id,
                    name: selectedPokemon?.name,
                    image: `${IMAGE_URL}/${selectedPokemon?.id}.png`,
                    types: selectedPokemon?.types,
                  });
            }}
            size='lg'
          >
            <Text fontSize='xl'>{isCatchedPokemon ? 'Release' : 'Catch'}</Text>
          </Checkbox>
        </Box>
        <AspectRatio w='full' ratio={1}>
          <Image
            alt='pokemon image'
            objectFit='contain'
            src={`${IMAGE_URL}/${selectedPokemon?.id}.png`}
          />
        </AspectRatio>
        <Stack direction='row' justifyContent='space-between'>
          {infoRequired.map((info, index) => (
            <Stack key={index} alignItems='center'>
              <Text
                fontSize='xl'
                as='b'
                _firstLetter={{ textTransform: 'uppercase' }}
              >
                {info}
              </Text>
              <Text as='b' fontSize='xl'>
                {selectedPokemon?.[info]}
              </Text>
            </Stack>
          ))}

          <Stack alignItems='center'>
            <Text fontSize='xl' as='b'>
              Moves
            </Text>
            <Text as='b' fontSize='xl'>
              {selectedPokemon?.moves?.length}
            </Text>
          </Stack>
          <Stack alignItems='center'>
            <Text fontSize='xl' as='b'>
              Types
            </Text>
            <HStack>
              {selectedPokemon?.types?.map((type: PokeType) => (
                <Badge
                  size='xl'
                  key={type.slot}
                  borderRadius='xl'
                  p='1'
                  bgColor={isCatchedPokemon ? 'red.600' : 'gray.300'}
                  color={isCatchedPokemon ? 'white' : 'black'}
                >
                  {type.type.name}
                </Badge>
              ))}
            </HStack>
          </Stack>
        </Stack>
      </Stack>

      <Stack
        spacing='5'
        p='5'
        bg={isCatchedPokemon ? 'red.300' : 'gray.100'}
        borderRadius='xl'
        w='full'
        justifyContent='center'
      >
        {selectedPokemon?.stats?.map((stat: Stat) => (
          <Stack key={stat.stat.url}>
            <Text
              fontSize='xl'
              as='b'
              _firstLetter={{ textTransform: 'uppercase' }}
            >
              {stat.stat.name}
            </Text>
            <Progress
              bg='gray.300'
              borderRadius='full'
              colorScheme={isCatchedPokemon ? 'red' : 'blue'}
              value={stat.base_stat}
            />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
