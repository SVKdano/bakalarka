import { TestBed } from '@angular/core/testing';

import { DoktorService } from './doktor.service';

describe('DoktorService', () => {
  let service: DoktorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoktorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
