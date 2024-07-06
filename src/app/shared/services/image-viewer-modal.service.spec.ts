import { TestBed } from '@angular/core/testing';

import { ImageViewerModalService } from './image-viewer-modal.service';

describe('ImageViewerModalService', () => {
  let service: ImageViewerModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageViewerModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
