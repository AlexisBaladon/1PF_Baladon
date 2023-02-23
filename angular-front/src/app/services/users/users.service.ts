import { HttpClient, HttpHandler } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import User from 'src/app/interfaces/user';
import { FilterPipe } from 'src/app/pipes/filter/filter.pipe';
import { FilterableDataService } from '../filterables/data/filterableData.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends FilterableDataService<User> {
  constructor( filterPipe: FilterPipe, httpClient: HttpClient) {
    super(filterPipe, [], httpClient, '/api/users');
  }
}
