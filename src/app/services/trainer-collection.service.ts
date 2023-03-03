import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Pokemon } from '../models/pokemon.model';
import { User } from '../models/user.model';
import { StorageUtil } from '../utils/storage.util';
import { UserService } from './user.service';

const { API_URL, API_KEY } = environment;

@Injectable({
  providedIn: 'root'
})
export class TrainerCollectionService {

  private _collection: Pokemon[] = [];
  private _error: string = "";
  private _loading: boolean = false;

  get collection(): Pokemon[] {
    return this._collection;
  }

  get error(): string {
    return this._error;
  }

  get loading(): boolean {
    return this._loading;
  }

  constructor(
    private readonly userService: UserService,
    private readonly http: HttpClient
  ) { }

  /**
   * Retrieves the user and sets the collection to the retrieved
   * user's collection of pokemon
   */
  public findAllPokemon(): void {
    this._loading = true;

    // Because of some unwanted behaviour of the caching of some browsers,
    // this header is set to force the request to bypass the cache and retrieve fresh values
    // as sometimes the request would retrieve the cached values even though the server-side values
    // had changed.
    const headers = {
      "Cache-Control": "no-cache"
    }

    this.http.get<User[]>(`${API_URL}?username=${this.userService.user?.username}`, { headers })
      .pipe(
        finalize(() => {
          this._loading = false;
        })
      )
      .subscribe({
        next: (users: User[]) => {
          let user = users.pop();
          this._collection = user!.pokemon;
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      })
  }

  /**
   * Removes a pokemon form a users collection by patching the user 
   * with a new collection array
   * @param pokemon The pokemon object to be removed
   * @returns The user after patching
   */
  public removePokemon(pokemon: Pokemon): Observable<User> {
    let user: User | undefined = StorageUtil.read(StorageKeys.User);
    
    let index = -1;
    user?.pokemon.forEach((pkmon, i) => {
      // We identify the correct index of the pokemon to be removed by its name.
      // indexOf(object) could have been used here instead of a foreach,
      // but for some reason it did not work
      if(pkmon.name === pokemon.name){
        index = i;
      }
    });

    // If the pokemon exists, we remove it and then patch with the new, reduced collection
    if(index >= 0){user!.pokemon.splice(index, 1);}

    const headers = new HttpHeaders({
      "content-type": "application/json",
      "x-api-key": API_KEY
    });
    return this.http.patch<User>(`${API_URL}/${user!.id}`, user, { headers })
  }

}
