import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionDepCiuComponent } from './creacion-dep-ciu.component';

describe('CreacionDepCiuComponent', () => {
  let component: CreacionDepCiuComponent;
  let fixture: ComponentFixture<CreacionDepCiuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreacionDepCiuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreacionDepCiuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
