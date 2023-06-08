import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarAsesorSolicitudComponent } from './cambiar-asesor-solicitud.component';

describe('CambiarAsesorSolicitudComponent', () => {
  let component: CambiarAsesorSolicitudComponent;
  let fixture: ComponentFixture<CambiarAsesorSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CambiarAsesorSolicitudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CambiarAsesorSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
