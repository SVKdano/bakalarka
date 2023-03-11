import { TestBed } from '@angular/core/testing';

import { PacientService } from './pacient.service';

describe('PacientService', () => {
  let service: PacientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PacientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
