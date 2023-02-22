import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import User from 'src/app/interfaces/user';
import { FilterPipe } from 'src/app/pipes/filter/filter.pipe';
import { createUsers, jsonParser } from 'src/app/utils/jsonParser';
import * as users from 'src/assets/data/users.json';
import { FilterableDataService } from '../filterables/data/filterableData.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends FilterableDataService<User> {
  private users: User[] = jsonParser<User>(users);
  private users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(this.users);

  constructor( filterPipe: FilterPipe ) {
    const parsedUsers: User[] = jsonParser<User>(users);
    const filterableData: User[] = createUsers(parsedUsers);
    super(filterPipe, filterableData);
   }

  public getUserByEmail(email: User['email']): Observable<User | null> {
    return this.users$.pipe(map(users => users.find(user => user.email === email) as User));
  }


}
