import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalCloseButton,
} from '@chakra-ui/react';
import PokemonData from './PokemonData';
import { usePokemon } from '@/context/PokemonContext';

const PokemonModal = () => {
  const { selectedPokemon, pokemonDataModal } = usePokemon();
  return (
    <Modal {...pokemonDataModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textTransform='capitalize'>
          {selectedPokemon?.name}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>{selectedPokemon && <PokemonData />}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PokemonModal;
