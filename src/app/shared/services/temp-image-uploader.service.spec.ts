import { TestBed } from '@angular/core/testing';

import { TempImageUploaderService } from './temp-image-uploader.service';

describe('TempImageUploaderService', () => {
  let service: TempImageUploaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TempImageUploaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
