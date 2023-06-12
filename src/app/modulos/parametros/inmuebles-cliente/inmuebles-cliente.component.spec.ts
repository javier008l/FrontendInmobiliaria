import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InmueblesClienteComponent } from './inmuebles-cliente.component';

describe('InmueblesClienteComponent', () => {
  let component: InmueblesClienteComponent;
  let fixture: ComponentFixture<InmueblesClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InmueblesClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InmueblesClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
