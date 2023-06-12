import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearSolicitudesClienteComponent } from './crear-solicitudes-cliente.component';

describe('CrearSolicitudesClienteComponent', () => {
  let component: CrearSolicitudesClienteComponent;
  let fixture: ComponentFixture<CrearSolicitudesClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearSolicitudesClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearSolicitudesClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
