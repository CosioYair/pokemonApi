import { Component } from '@angular/core';
import { PokemonService } from '../shared/services/pokemon.service';
import { Pokemon } from '../shared/models/pokemon/pokemon';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public pokemons: Pokemon[] = [];
  public pokemonName: string;

  constructor(private _pokemonService: PokemonService) { }

  catchPokemon() {
    this._pokemonService.getPokemonDetails(this.pokemonName)
      .pipe(
        take(1)
      )
      .subscribe(pokemonDetail => {
        const pokemon: Pokemon = {
          name: pokemonDetail.name,
          details: pokemonDetail
        };
        this.pokemons.push(pokemon);
      });
  }
}
