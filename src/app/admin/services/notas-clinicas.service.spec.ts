import { TestBed } from '@angular/core/testing';

import { NotasClinicasService } from './notas-clinicas.service';

describe('NotasClinicasService', () => {
  let service: NotasClinicasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotasClinicasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
