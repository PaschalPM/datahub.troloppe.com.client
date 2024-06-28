import { TestBed } from '@angular/core/testing';

import { ActiveLocationService } from './active-location.service';

describe('ActiveLocationService', () => {
  let service: ActiveLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
