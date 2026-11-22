import { TestBed } from '@angular/core/testing';

import { AdvancedQuery } from './advanced-query';

describe('AdvancedQuery', () => {
  let service: AdvancedQuery;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvancedQuery);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
