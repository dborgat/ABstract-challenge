export interface PokemonInterface {
    name: string;
    url: string;
}

export interface CatchedPokemons {
    id: number;
    name: string;
}

export interface PokemonApiResponse {
    height: number;
    id: number;
    moves: Move[];
    name: string;
    stats: Stat[];
    types: PokeType[];
    weight: number;
}
export interface PokeType {
    slot: number;
    type: Ability;
}
export interface Stat {
    base_stat: number;
    effort: number;
    stat: Ability;
}
interface Move {
    move: Ability;
    version_group_details: Versiongroupdetail[];
}
interface Versiongroupdetail {
    level_learned_at: number;
    move_learn_method: Ability;
    version_group: Ability;
}
interface Ability {
    name: string;
    url: string;
}