import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon/pokemon';
import { map } from 'rxjs/operators';
import { PokemonDetails } from '../models/pokemon/pokemon-details';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private _http: HttpClient) { }

  getPokemonDetails(name: string): Observable<PokemonDetails> {
    return this._http.get<PokemonDetails>(`${environment.api}/pokemon/${name}`);
  }
}
