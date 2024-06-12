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

const PokemonModal = ({ pokemonDataModal, selectedPokemon }: any) => {
  return (
    <Modal {...pokemonDataModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textTransform='capitalize'>
          {selectedPokemon?.name}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {selectedPokemon && <PokemonData pokemon={selectedPokemon} />}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PokemonModal;
