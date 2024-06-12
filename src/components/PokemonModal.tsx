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
  addCatchedPokemon,
  deleteCatchedPokemon,
}: {
  pokemonDataModal: any;
  selectedPokemon: RootObject | undefined;
  catched: CatchedPokemons[];
  addCatchedPokemon: (pokemon: CatchedPokemons) => void;
  deleteCatchedPokemon: (pokemonId: number) => void;
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
            <PokemonData
              selectedPokemon={selectedPokemon}
              catched={catched}
              addCatchedPokemon={addCatchedPokemon}
              deleteCatchedPokemon={deleteCatchedPokemon}
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PokemonModal;
