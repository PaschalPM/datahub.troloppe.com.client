import { TestBed } from '@angular/core/testing';

import { HttpRequestCacheService } from './http-request-cache.service';

describe('HttpRequestCacheService', () => {
  let service: HttpRequestCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpRequestCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
