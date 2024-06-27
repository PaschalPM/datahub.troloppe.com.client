import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeolocationAlertModalComponent } from './geolocation-alert-modal.component';

describe('GeolocationAlertModalComponent', () => {
  let component: GeolocationAlertModalComponent;
  let fixture: ComponentFixture<GeolocationAlertModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeolocationAlertModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeolocationAlertModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
