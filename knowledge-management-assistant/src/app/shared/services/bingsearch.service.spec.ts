import { TestBed } from '@angular/core/testing';

import { BingsearchService } from './bingsearch.service';

describe('BingsearchService', () => {
  let service: BingsearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BingsearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
