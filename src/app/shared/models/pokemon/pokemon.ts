import { PokemonDetails } from './pokemon-details';

export interface Pokemon {
    name: string;
    url?: string;
    details?: PokemonDetails;
}
