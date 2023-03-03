import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageKeys } from '../enums/storage-keys.enum';
import { PokemonPublic, PokemonPublicSingle } from '../models/pokemon-public.model';
import { Pokemon } from '../models/pokemon.model';
import { User } from '../models/user.model';
import { StorageUtil } from '../utils/storage.util';

const { POKEMON_API_URL, API_KEY, API_URL } = environment
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

  public addPokemon(pokemon: Pokemon): Observable<User> {
    let user: User | undefined = StorageUtil.read(StorageKeys.User);
    user!.pokemon.push(pokemon);
    const headers = new HttpHeaders({
      "content-type": "application/json",
      "x-api-key": API_KEY
    })
    return this.http.patch<User>(`${API_URL}/${user!.id}`, user, { headers })
  }

}
