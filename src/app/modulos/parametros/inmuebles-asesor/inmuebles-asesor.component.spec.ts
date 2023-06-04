import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InmueblesAsesorComponent } from './inmuebles-asesor.component';

describe('InmueblesAsesorComponent', () => {
  let component: InmueblesAsesorComponent;
  let fixture: ComponentFixture<InmueblesAsesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InmueblesAsesorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InmueblesAsesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
