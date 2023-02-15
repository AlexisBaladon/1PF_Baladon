import { TestBed } from '@angular/core/testing';
import { Filterable } from 'src/app/logic/filter/filterable';

import { FilterableDataService } from './filterableData.service';

describe('UserService', () => {
  let service: FilterableDataService<Filterable>; //TODO: see

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterableDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
