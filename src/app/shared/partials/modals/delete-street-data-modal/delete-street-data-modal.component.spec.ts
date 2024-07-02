import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteStreetDataModalComponent } from './delete-street-data-modal.component';

describe('DeleteStreetDataModalComponent', () => {
  let component: DeleteStreetDataModalComponent;
  let fixture: ComponentFixture<DeleteStreetDataModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteStreetDataModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteStreetDataModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
