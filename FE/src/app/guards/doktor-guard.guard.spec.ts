import { TestBed } from '@angular/core/testing';

import { DoktorGuardGuard } from './doktor-guard.guard';

describe('DoktorGuardGuard', () => {
  let guard: DoktorGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DoktorGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
