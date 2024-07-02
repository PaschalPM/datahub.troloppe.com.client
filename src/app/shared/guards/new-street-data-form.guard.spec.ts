import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { newStreetDataFormGuard } from './new-street-data-form.guard';

describe('newStreetDataFormGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => newStreetDataFormGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
