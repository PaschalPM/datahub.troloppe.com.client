import { TestBed } from '@angular/core/testing';

import { StreetDataService } from './street-data.service';

describe('StreetDataService', () => {
  let service: StreetDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StreetDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
