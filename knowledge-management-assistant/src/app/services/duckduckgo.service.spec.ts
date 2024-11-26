import { TestBed } from '@angular/core/testing';

import { DuckduckgoService } from './duckduckgo.service';

describe('DuckduckgoService', () => {
  let service: DuckduckgoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DuckduckgoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
