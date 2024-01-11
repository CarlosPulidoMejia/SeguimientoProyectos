import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosBauComponent } from './proyectos.component';

describe('ProyectosBauComponent', () => {
  let component: ProyectosBauComponent;
  let fixture: ComponentFixture<ProyectosBauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyectosBauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectosBauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
