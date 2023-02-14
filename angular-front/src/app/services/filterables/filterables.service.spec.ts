import { TestBed } from '@angular/core/testing';

import { FilterablesService } from './filterables.service';

describe('FilterablesService', () => {
  let service: FilterablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
