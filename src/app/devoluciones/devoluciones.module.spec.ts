import { DevolucionesModule } from './devoluciones.module';

describe('DevolucionesModule', () => {
  let devolucionesModule: DevolucionesModule;

  beforeEach(() => {
    devolucionesModule = new DevolucionesModule();
  });

  it('should create an instance', () => {
    expect(devolucionesModule).toBeTruthy();
  });
});
