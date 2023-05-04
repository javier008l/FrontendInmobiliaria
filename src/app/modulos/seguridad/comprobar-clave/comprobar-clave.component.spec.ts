import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprobarClaveComponent } from './comprobar-clave.component';

describe('ComprobarClaveComponent', () => {
  let component: ComprobarClaveComponent;
  let fixture: ComponentFixture<ComprobarClaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComprobarClaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComprobarClaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
