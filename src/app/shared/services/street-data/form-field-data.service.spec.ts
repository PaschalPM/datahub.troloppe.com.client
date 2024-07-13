import { TestBed } from '@angular/core/testing';

import { FormFieldDataService } from './form-field-data.service';

describe('FormFieldDataService', () => {
  let service: FormFieldDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormFieldDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
