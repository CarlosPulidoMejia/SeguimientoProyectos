import { CertificacionesModule } from './certificaciones.module';

describe('CertificacionesModule', () => {
  let certificacionesModule: CertificacionesModule;

  beforeEach(() => {
    certificacionesModule = new CertificacionesModule();
  });

  it('should create an instance', () => {
    expect(certificacionesModule).toBeTruthy();
  });
});
