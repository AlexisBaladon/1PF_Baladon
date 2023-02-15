import { TestBed } from '@angular/core/testing';

import { FilterableContextService } from './filterableContext.service';

describe('FilterablesService', () => {
  let service: FilterableContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterableContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
