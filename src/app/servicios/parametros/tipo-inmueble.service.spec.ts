import { TestBed } from '@angular/core/testing';

import { TipoInmuebleService } from './tipo-inmueble.service';

describe('TipoInmuebleService', () => {
  let service: TipoInmuebleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoInmuebleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
