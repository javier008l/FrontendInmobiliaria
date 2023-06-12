import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAsesorComponent } from './listar-asesor.component';

describe('ListarAsesorComponent', () => {
  let component: ListarAsesorComponent;
  let fixture: ComponentFixture<ListarAsesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarAsesorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarAsesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
