import { TestBed, inject } from '@angular/core/testing';
import { ConfigService } from './config.service';

describe('ProyectoBauService', () => {
    beforeEach(() => {
    TestBed.configureTestingModule({
            providers: [ConfigService]
        });
    });

    it('should be created', inject([ConfigService], (service: ConfigService) => {
        expect(service).toBeTruthy();
    }));
});
