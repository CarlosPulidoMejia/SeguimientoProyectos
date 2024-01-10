import { TestBed, inject } from '@angular/core/testing';

import { DevolucionesService } from './devoluciones.service';

describe('DevolucionesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DevolucionesService]
    });
  });

  it('should be created', inject([DevolucionesService], (service: DevolucionesService) => {
    expect(service).toBeTruthy();
  }));
});
