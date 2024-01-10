import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvioOrdenesComponent } from './envio-ordenes.component';

describe('EnvioOrdenesComponent', () => {
  let component: EnvioOrdenesComponent;
  let fixture: ComponentFixture<EnvioOrdenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvioOrdenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvioOrdenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
