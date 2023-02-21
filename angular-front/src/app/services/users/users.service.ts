import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import User from 'src/app/interfaces/user';
import { jsonParser } from 'src/app/utils/jsonParser';
import * as users from 'src/assets/data/users.json';
import { API_URL } from 'src/app/constants/env';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users: User[] = jsonParser<User>(users);
  private users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(this.users);

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    this.http.get<User[]>(`/api/users`).subscribe(users => {
      console.log(users);
      this.users$.next(users);
    });
    return this.users$.asObservable();
  }

  public addUser(user: User): void {
    this.users$.next([...this.users$.getValue(), user]);
  }

  public removeUser(user: User): void {
    this.users$.next(this.users$.getValue().filter(u => u.id !== user.id));
  }

  public updateUser(user: User): void {
    this.users$.next(this.users$.getValue().map(u => u.id === user.id ? user : u));
  }

  public getUserById(id: User['id']): Observable<User | null> {
    return this.users$.pipe(map(users => users.find(user => user.id === id) as User));
  }

  public getUserByEmail(email: User['email']): Observable<User | null> {
    return this.users$.pipe(map(users => users.find(user => user.email === email) as User));
  }


}
