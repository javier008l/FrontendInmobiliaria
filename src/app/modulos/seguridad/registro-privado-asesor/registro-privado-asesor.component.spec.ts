import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPrivadoAsesorComponent } from './registro-privado-asesor.component';

describe('RegistroPrivadoAsesorComponent', () => {
  let component: RegistroPrivadoAsesorComponent;
  let fixture: ComponentFixture<RegistroPrivadoAsesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroPrivadoAsesorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroPrivadoAsesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
