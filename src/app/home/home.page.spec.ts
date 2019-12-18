import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { PokemonService } from '../shared/services/pokemon.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { PokemonDetails } from '../shared/models/pokemon/pokemon-details';

fdescribe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  const pokemonName: string = 'pikachu';
  const mockResponse: PokemonDetails = {
    id: 1,
    name: pokemonName,
    sprites: {
      back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
      back_female: '',
      back_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png',
      back_shiny_female: '',
      front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      front_female: '',
      front_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png',
      front_shiny_female: ''
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [
        CommonModule,
        FormsModule,
        IonicModule.forRoot(),
        HttpClientTestingModule
      ],
      providers: [PokemonService]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', async(inject([PokemonService], (_pokemonService: PokemonService) => {
    expect(component).toBeTruthy();
  })));

  describe('should catch the pokemon', () => {
    it('should get results',
      inject([HttpTestingController, PokemonService], (httpMock: HttpTestingController, _pokemonService: PokemonService) => {
        _pokemonService.getPokemonDetails(pokemonName)
          .subscribe(
            (res) => {
              expect(res).toEqual(mockResponse);
            }
          );
        const req = httpMock.expectOne(`${environment.api}/pokemon/${pokemonName}`);
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
        fixture.detectChanges();
      })
    );
  });

});
