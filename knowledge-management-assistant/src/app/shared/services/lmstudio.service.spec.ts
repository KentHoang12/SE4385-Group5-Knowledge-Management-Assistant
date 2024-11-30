import { TestBed } from '@angular/core/testing';

import { LmstudioService } from './lmstudio.service';

describe('LmstudioService', () => {
  let service: LmstudioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LmstudioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
