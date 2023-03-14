import { TestBed } from '@angular/core/testing';

import { PacientGuardGuard } from './pacient-guard.guard';

describe('PacientGuardGuard', () => {
  let guard: PacientGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PacientGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
