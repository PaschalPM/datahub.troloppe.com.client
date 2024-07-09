import { TestBed } from '@angular/core/testing';

import { StreetDataOverviewService } from './street-data-overview.service';

describe('StreetDataOverviewService', () => {
  let service: StreetDataOverviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StreetDataOverviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
