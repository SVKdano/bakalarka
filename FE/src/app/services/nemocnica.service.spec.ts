import { TestBed } from '@angular/core/testing';

import { NemocnicaService } from './nemocnica.service';

describe('NemocnicaService', () => {
  let service: NemocnicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NemocnicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
