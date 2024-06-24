import { TestBed } from '@angular/core/testing';

import { NewStreetDataFormService } from './new-street-data-form.service';

describe('NewStreetDataFormService', () => {
  let service: NewStreetDataFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewStreetDataFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
