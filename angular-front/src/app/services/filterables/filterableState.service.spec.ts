import { TestBed } from '@angular/core/testing';

import { FilterableStateService } from './filterableState.service';

describe('FilterablesService', () => {
  let service: FilterableStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterableStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
