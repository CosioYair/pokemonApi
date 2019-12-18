import { PokemonSprite } from './pokemon-sprite';

export interface PokemonDetails {
    id: number;
    name: string;
    sprites: PokemonSprite;
}
