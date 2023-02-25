import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import User from 'src/app/interfaces/user';

type LoginResponse = User & { token: string };

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

  public getError(): Observable<string | null> {
    return this.error$.asObservable();
  }

  public login(email: User["email"], password: User["password"]): void {
    if (!!this.user$.getValue()) {
      this.error$.next("You are already logged in");
      return;
    }

    this.http.post<LoginResponse>('/api/auth/login', { email, password }).pipe(
      map((response) => {
        this.userToken = response.token;
        this.user$.next(response);
      }),
      catchError((error) => {
        this.error$.next(error.error);
        throw error;
      })
    ).subscribe();
  }

  public signup(name: User["name"], surname: User["surname"], email: User["email"], password: User["password"]): void {
    if (!!this.user$.getValue()) {
      this.error$.next("You are already logged in");
      return;
    }

    this.http.post<LoginResponse>(
      '/api/auth/signup',{ 
        name, surname, email, password, 
        headers: { Authorization: `Bearer ${this.userToken}` },
        responseType: 'json', 
      }).pipe(
        map((response) => {
          this.userToken = response.token;
          this.login(email, password);
        }),
        catchError((error) => {
          this.error$.next(error.error);
          throw error;
        })
    ).subscribe();
  }

  public logout(): void {
    this.user$.next(null);
    this.userToken = null;

    this.http.delete<{}>(
      '/api/auth/logout', { 
        headers: { Authorization: `Bearer ${this.userToken}` },
        responseType: 'json',
      },
    ).pipe(
      catchError((error) => {
        this.error$.next(error.error);
        throw error;
      })
    ).subscribe();
  }

  private refreshToken(): void {
    this.http.post<LoginResponse>(
      '/api/auth/token', { 
        headers: { Authorization: `Bearer ${this.userToken}` },
        responseType: 'json',
      },
    ).pipe(
      map((response) => {
        this.userToken = response.token;
      }),
      catchError((error) => {
        this.error$.next(error.error);
        throw error;
      })
    ).subscribe();
  }
}
