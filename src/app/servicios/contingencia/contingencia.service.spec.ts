import { TestBed, inject } from '@angular/core/testing';

import { ContingenciaService } from './contingencia.service';

describe('ContingenciaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContingenciaService]
    });
  });

  it('should be created', inject([ContingenciaService], (service: ContingenciaService) => {
    expect(service).toBeTruthy();
  }));
});
