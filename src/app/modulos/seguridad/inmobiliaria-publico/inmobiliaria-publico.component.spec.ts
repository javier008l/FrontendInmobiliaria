import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InmobiliariaPublicoComponent } from './inmobiliaria-publico.component';

describe('InmobiliariaPublicoComponent', () => {
  let component: InmobiliariaPublicoComponent;
  let fixture: ComponentFixture<InmobiliariaPublicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InmobiliariaPublicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InmobiliariaPublicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
