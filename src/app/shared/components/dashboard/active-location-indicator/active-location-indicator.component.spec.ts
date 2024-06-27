import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveLocationIndicatorComponent } from './active-location-indicator.component';

describe('ActiveLocationIndicatorComponent', () => {
  let component: ActiveLocationIndicatorComponent;
  let fixture: ComponentFixture<ActiveLocationIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveLocationIndicatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActiveLocationIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
