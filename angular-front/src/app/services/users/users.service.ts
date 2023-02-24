import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import User from 'src/app/interfaces/user';
import { FilterPipe } from 'src/app/pipes/filter/filter.pipe';
import { createUsers } from 'src/app/utils/jsonParser';
import { FilterableDataService } from '../filterables/data/filterableData.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends FilterableDataService<User> {
  constructor( filterPipe: FilterPipe, httpClient: HttpClient) {
    super(filterPipe, httpClient, '/api/users');
  }

  protected createData(users: User[]): User[] {
    return createUsers(users);
  }

}
