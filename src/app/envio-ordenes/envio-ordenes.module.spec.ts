import { EnvioOrdenesModule } from './envio-ordenes.module';

describe('EnvioOrdenesModule', () => {
  let envioOrdenesModule: EnvioOrdenesModule;

  beforeEach(() => {
    envioOrdenesModule = new EnvioOrdenesModule();
  });

  it('should create an instance', () => {
    expect(envioOrdenesModule).toBeTruthy();
  });
});
