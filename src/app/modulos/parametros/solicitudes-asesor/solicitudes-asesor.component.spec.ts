import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesAsesorComponent } from './solicitudes-asesor.component';

describe('SolicitudesAsesorComponent', () => {
  let component: SolicitudesAsesorComponent;
  let fixture: ComponentFixture<SolicitudesAsesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudesAsesorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudesAsesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
