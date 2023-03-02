import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PokemonPublic, PokemonPublicSingle } from '../models/pokemon-public.model';
import { Pokemon } from '../models/pokemon.model';

const { POKEMON_API_URL } = environment
const imgUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
const pageSize = 18;

@Injectable({
  providedIn: 'root'
})
export class PokemonCatalogueService {

  private _catalogue: Pokemon[] = [];
  private _error: string = "";
  private _loading: boolean = false;

  get catalogue(): Pokemon[] {
    return this._catalogue;
  }

  get error(): string {
    return this._error;
  }

  get loading(): boolean {
    return this._loading;
  }

  constructor(
    private readonly http: HttpClient
  ) { }

  public findAllPokemon(): void {
    this._loading = true;
    this.http.get<PokemonPublic>(`${POKEMON_API_URL}?limit=${pageSize}`)
      .pipe(
        finalize(() => {
          this._loading = false;
        })
      )
      .subscribe({
        next: (response: PokemonPublic) => {
          console.log(response.results);
          this._catalogue = response.results.map((pokemon: PokemonPublicSingle) => {
            let id = pokemon.url.split("/")[6];
            let img = imgUrl + id + ".png";
            return {"name": pokemon.name, "avatar": img};
          })
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      })
  }

}
