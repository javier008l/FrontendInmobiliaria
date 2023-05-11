import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioContactoAsesorComponent } from './formulario-contacto-asesor.component';

describe('FormularioContactoAsesorComponent', () => {
  let component: FormularioContactoAsesorComponent;
  let fixture: ComponentFixture<FormularioContactoAsesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioContactoAsesorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioContactoAsesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
