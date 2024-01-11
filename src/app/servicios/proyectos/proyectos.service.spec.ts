import { TestBed, inject } from '@angular/core/testing';

import { ProyectoBauService } from './proyectos.service';

describe('ProyectoBauService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProyectoBauService]
    });
  });

  it('should be created', inject([ProyectoBauService], (service: ProyectoBauService) => {
    expect(service).toBeTruthy();
  }));
});
