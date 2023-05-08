import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPublicoAsesorComponent } from './registro-publico-asesor.component';

describe('RegistroPublicoAsesorComponent', () => {
  let component: RegistroPublicoAsesorComponent;
  let fixture: ComponentFixture<RegistroPublicoAsesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroPublicoAsesorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroPublicoAsesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
