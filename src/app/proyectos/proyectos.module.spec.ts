import { ProyectosModule } from './proyectos.module';

describe('DevolucionesModule', () => {
  let proyectosModule: ProyectosModule;

  beforeEach(() => {
    proyectosModule = new ProyectosModule();
  });

  it('should create an instance', () => {
    expect(proyectosModule).toBeTruthy();
  });
});
