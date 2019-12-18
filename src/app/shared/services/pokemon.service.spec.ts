import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';
import { Pokemon } from '../models/pokemon/pokemon';
import { environment } from 'src/environments/environment';

describe('PokemonService', () => {
  let service: PokemonService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  const pokemonName: string = 'pikachu';
  const mockResponse: Pokemon = {
    name: pokemonName
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = TestBed.get(PokemonService);
  });

  it('should be created', () => {
    const service: PokemonService = TestBed.get(PokemonService);
    expect(service).toBeTruthy();
  });

  it('should call the method getPokemonDetails() and return the pokemon details', () => {
    service.getPokemonDetails(pokemonName).subscribe((pokemon: Pokemon) => {
      expect(pokemon).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`${environment.api}/pokemon/${pokemonName}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
