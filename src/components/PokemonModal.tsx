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
import { CatchedPokemons, RootObject } from '@/types';

const PokemonModal = ({
  pokemonDataModal,
  selectedPokemon,
  catched,
}: {
  pokemonDataModal: any;
  selectedPokemon: RootObject | undefined;
  catched: CatchedPokemons[];
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
          {selectedPokemon && (
            <PokemonData selectedPokemon={selectedPokemon} catched={catched} />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PokemonModal;
