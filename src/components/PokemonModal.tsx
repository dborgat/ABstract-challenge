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
import { RootObject } from '@/types';

const PokemonModal = ({
  pokemonDataModal,
  selectedPokemon,
}: {
  pokemonDataModal: any;
  selectedPokemon: RootObject | undefined;
}) => {
  return (
    <Modal {...pokemonDataModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textTransform='capitalize'>
          {selectedPokemon?.name}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {selectedPokemon && <PokemonData selectedPokemon={selectedPokemon} />}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PokemonModal;
