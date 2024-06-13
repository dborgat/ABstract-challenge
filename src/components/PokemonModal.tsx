import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  Text,
} from '@chakra-ui/react';
import PokemonData from './PokemonData';
import { usePokemon } from '@/context/PokemonContext';
import { CatchedPokemons } from '@/types/Pokemon';

const PokemonModal = () => {
  const { selectedPokemon, pokemonDataModal, pokemonsCatched } = usePokemon();

  const isCatched = (element: CatchedPokemons) =>
    element.id === selectedPokemon?.id;
  const isCatchedPokemon = pokemonsCatched.some(isCatched);

  return (
    <Modal
      {...pokemonDataModal}
      motionPreset='slideInBottom'
      isCentered
      size={[null, 'xl', '3xl']}
    >
      <ModalOverlay backdropFilter='blur(10px)' />
      <ModalContent bgColor={isCatchedPokemon ? 'red.200' : 'white'}>
        <ModalHeader
          textTransform='capitalize'
        >
          <Text fontSize={[35, 30]}>{selectedPokemon?.name}</Text>
        </ModalHeader>
        <ModalCloseButton w='10' h='10' size={'xl'} />
        <ModalBody>{selectedPokemon && <PokemonData />}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PokemonModal;
