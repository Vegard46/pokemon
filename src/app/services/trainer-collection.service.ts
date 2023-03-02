import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Pokemon } from '../models/pokemon.model';
import { User } from '../models/user.model';
import { UserService } from './user.service';

const { API_URL } = environment;

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
    this.http.get<User[]>(`${API_URL}?username=${this.userService.user?.username}`)
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
}
