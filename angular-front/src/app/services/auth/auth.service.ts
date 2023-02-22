import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import User from 'src/app/interfaces/user';
import { generateId } from 'src/app/utils/idGenerator';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [];
  private user$ = new BehaviorSubject<User | null>(new User(generateId(), "", "Lucas", "", "", "admin"));
  private error$ = new BehaviorSubject<string | null>(null);
  private userService$: Subscription | null = null;

  constructor(private userService: UsersService) {
    this.userService$ = this.userService.getData().subscribe(users => {
      this.users = users;
    });
  }

  ngOnDestroy() {
    if (!!this.userService$) {
      this.userService$.unsubscribe();
    }
  }

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

    const foundUser = this.users.find(user => user.email === email && user.password === password);
    if (!!foundUser) {
      this.user$.next(foundUser);
    }
    else {
      this.error$.next("Invalid credentials");
    }
  }

  public signup(name: User["name"], surname: User["surname"], email: User["email"], password: User["password"]): void {
    if (!!this.user$.getValue()) {
      this.error$.next("You are already logged in");
      return;
    }

    if (this.users.find(user => user.email === email)) {
      this.error$.next("User already exists");
      return;
    }

    this.userService.addData(new User(
      generateId(),
      email,
      name,
      surname,
      password,
      'user'
    ))
    this.login(email, password);
  }

  public logout(): void {
    this.user$.next(null);
  }
}
