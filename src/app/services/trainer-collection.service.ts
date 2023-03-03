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

  public findAllPokemon(): void {
    this._loading = true;

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
          console.log(user?.pokemon);
          console.log(StorageUtil.read(StorageKeys.User))
          this._collection = user!.pokemon;
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      })
  }

  public removePokemon(pokemon: Pokemon): Observable<User> {
    let user: User | undefined = StorageUtil.read(StorageKeys.User);
    
    let index = -1;
    user?.pokemon.forEach((pkmon, i) => {
      if(pkmon.name === pokemon.name){
        index = i;
      }
    });

    if(index >= 0){user!.pokemon.splice(index, 1);}

    const headers = new HttpHeaders({
      "content-type": "application/json",
      "x-api-key": API_KEY
    });
    return this.http.patch<User>(`${API_URL}/${user!.id}`, user, { headers })
  }

}
