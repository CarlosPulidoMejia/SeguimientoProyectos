import { TestBed } from '@angular/core/testing';

import { CdaService } from './cda.service';

describe('CdaService', () => {
  let service: CdaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CdaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
