import { ConfigModule } from './config.module';

describe('configModule', () => {
  let configModule: ConfigModule;

  beforeEach(() => {
    configModule = new ConfigModule();
  });

  it('should create an instance', () => {
    expect(configModule).toBeTruthy();
  });
});
