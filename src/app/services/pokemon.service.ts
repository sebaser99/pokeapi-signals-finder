import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  constructor(private http: HttpClient){}

  private urlPokeApi = 'https://pokeapi.co/api/v2/pokemon';

    getPokemon(term: string | number): Observable<Pokemon> {
        const search = term.toString().toLowerCase();
        return this.http.get<Pokemon>(`${this.urlPokeApi}/${search}`);
    }
}
