import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { arthGuard } from './arth-guard';

describe('arthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => arthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
