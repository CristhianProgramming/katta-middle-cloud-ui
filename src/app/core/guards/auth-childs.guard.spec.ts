import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { authChildsGuard } from './auth-childs.guard';

describe('authChildsGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authChildsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
