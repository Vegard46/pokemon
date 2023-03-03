import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

const { API_URL } = environment;
const { API_KEY } = environment;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private readonly http: HttpClient) { }

  public login(username: string): Observable<User> {
    return this.checkIfUserExists(username)
      .pipe(
        switchMap((user: User | undefined) => {
          if (user === undefined) {
            return this.createUser(username);
          }
          return of(user);
        })
      );
  }

  private checkIfUserExists(username: string): Observable<User | undefined> {
    return this.http.get<User[]>(`${API_URL}?username=${username}`)
      .pipe(map((response: User[]) => response.pop()))
  }

  private createUser(username: string): Observable<User> {
    const user = {username, pokemon: []};
    const headers = new HttpHeaders({
      "content-type": "application/json",
      "x-api-key": API_KEY
    })

    return this.http.post<User>(API_URL, user, { headers })
  }

}
