import { TestBed, inject } from '@angular/core/testing';

import { EscenariosService } from './escenarios.service';

describe('EscenariosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EscenariosService]
    });
  });

  it('should be created', inject([EscenariosService], (service: EscenariosService) => {
    expect(service).toBeTruthy();
  }));
});
