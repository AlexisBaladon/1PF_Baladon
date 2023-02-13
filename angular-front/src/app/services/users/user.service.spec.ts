import { TestBed } from '@angular/core/testing';
import { Filterable } from 'src/app/logic/filter/filterable';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService<Filterable>; //TODO: see

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
