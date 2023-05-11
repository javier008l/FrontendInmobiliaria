import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioContactoClienteComponent } from './formulario-contacto-cliente.component';

describe('FormularioContactoClienteComponent', () => {
  let component: FormularioContactoClienteComponent;
  let fixture: ComponentFixture<FormularioContactoClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioContactoClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioContactoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
