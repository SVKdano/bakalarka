import { TestBed } from '@angular/core/testing';

import { NemocnicaGuardGuard } from './nemocnica-guard.guard';

describe('NemocnicaGuardGuard', () => {
  let guard: NemocnicaGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NemocnicaGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
