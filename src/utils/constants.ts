export const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
export const IMAGE_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home"
export const infoRequired = ['weight', 'height'] as const;
export const DEFAULT_SELECTED_POKEMON = {
    id: 0,
    name: '',
    types: [],
    height: 0,
    weight: 0,
    stats: [],
    moves: [],
}