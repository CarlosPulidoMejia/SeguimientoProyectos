import { TestBed, inject } from '@angular/core/testing';

import { MatrizcuentasService } from './matrizcuentas.service';

describe('MatrizcuentasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatrizcuentasService]
    });
  });

  it('should be created', inject([MatrizcuentasService], (service: MatrizcuentasService) => {
    expect(service).toBeTruthy();
  }));
});
