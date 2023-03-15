import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import User from 'src/app/interfaces/user';
import { BASE_URL } from '../env';

type LoginResponse = User & { refreshToken: string };

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userToken: string | null = null;
  private user$ = new BehaviorSubject<User | null>(null);
  private error$ = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) { }

  public getUser(): Observable<User | null> {
    return this.user$.asObservable();
  }

  public isAdmin(): boolean {
    return !!this.user$.getValue() && this.user$.getValue()?.profile === 'admin';
  }

  public getError(): Observable<string | null> {
    return this.error$.asObservable();
  }

  public isLoggedIn(): boolean {
    return !!this.user$.getValue();
  }

  public login(email: User["email"], password: User["password"]): void {
    this.error$.next(null);
    if (!!this.user$.getValue()) {
      this.error$.next("You are already logged in");
      return;
    }

    this.http.post<LoginResponse>(`${BASE_URL}/api/auth/login`, { email, password }).pipe(
      map((response) => {
        this.userToken = response.refreshToken;
        this.user$.next(response);
      }),
      catchError((error) => {
        this.error$.next(error.error);
        throw error;
      })
    ).subscribe();
  }

  public signup(name: User["name"], surname: User["surname"], email: User["email"], password: User["password"]): void {
    this.error$.next(null);
    if (!!this.user$.getValue()) {
      this.error$.next("You are already logged in");
      return;
    }

    this.http.post<LoginResponse>(
      `${BASE_URL}/api/auth/signup`,{ 
        name, surname, email, password,
        responseType: 'json', 
      }).pipe(
        map((response) => {
          this.userToken = response.refreshToken;
          this.login(email, password);
        }),
        catchError((error) => {
          console.log(error);
          this.error$.next(error.error);
          throw error;
        })
    ).subscribe();
  }

  public logout(): void {
    this.error$.next(null);
    this.user$.next(null);
    this.userToken = null;
  }

  private refreshToken(): void {
    this.http.post<LoginResponse>(
      `${BASE_URL}/api/auth/token`, { 
        headers: { Authorization: `Bearer ${this.userToken}` },
        responseType: 'json',
      },
    ).pipe(
      map((response) => {
        this.userToken = response.refreshToken;
      }),
      catchError((error) => {
        this.error$.next(error.error);
        throw error;
      })
    ).subscribe();
  }
}
