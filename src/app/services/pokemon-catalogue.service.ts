import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageKeys } from '../enums/storage-keys.enum';
import { PokemonPublic, PokemonPublicSingle } from '../models/pokemon-public.model';
import { Pokemon } from '../models/pokemon.model';
import { User } from '../models/user.model';
import { StorageUtil } from '../utils/storage.util';

const { POKEMON_API_URL, API_URL, API_KEY } = environment;
const imgUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

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

  /**
   * Retrieves a set of pokemon from the PokeAPI and
   * converts them to Pokemon objects
   * @param pageSize The amount of objects that should be displayed/retrieved 
   *                  for a single page
   * @param offset  The page-number which is used to calculate the offset of the request
   */
  public findAllPokemon(pageSize: number, offset: number): void {
    this._loading = true;
    // The offset of the request to the PokeAPI is the offset(pageNumber) multiplied by the size of the page
    this.http.get<PokemonPublic>(`${POKEMON_API_URL}?limit=${pageSize}&offset=${offset*pageSize}`)
      .pipe(
        finalize(() => {
          this._loading = false;
        })
      )
      .subscribe({
        next: (response: PokemonPublic) => {
          // We convert the response into Pokemon model objects by assigning them their
          // corresponding images based on the id of the pokemon retreived
          this._catalogue = response.results.map((pokemon: PokemonPublicSingle) => {
            // The pokemon id used to identify the correct image is extracted
            // from the url of the single pokemon resource in the PokeAPI
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

  /**
   * Adds a pokemon to the user's collection of pokemon and
   * patches the user
   * @param pokemon The pokemon to be added
   * @returns The user after it has been patched
   */
  public addPokemon(pokemon: Pokemon): Observable<User> {
    let user: User | undefined = StorageUtil.read(StorageKeys.User);
    // We simply add the pokemon to the user's collection before patching
    user!.pokemon.push(pokemon);
    const headers = new HttpHeaders({
      "content-type": "application/json",
      "x-api-key": API_KEY
    })
    return this.http.patch<User>(`${API_URL}/${user!.id}`, user, { headers })
  }

}
