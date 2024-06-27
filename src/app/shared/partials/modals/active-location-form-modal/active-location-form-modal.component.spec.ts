import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveLocationFormModalComponent } from './active-location-form-modal.component';

describe('ActiveLocationFormModalComponent', () => {
  let component: ActiveLocationFormModalComponent;
  let fixture: ComponentFixture<ActiveLocationFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveLocationFormModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActiveLocationFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
