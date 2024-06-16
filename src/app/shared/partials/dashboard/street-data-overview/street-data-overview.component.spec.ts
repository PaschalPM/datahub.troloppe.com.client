import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreetDataOverviewComponent } from './street-data-overview.component';

describe('StreetDataOverviewComponent', () => {
  let component: StreetDataOverviewComponent;
  let fixture: ComponentFixture<StreetDataOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StreetDataOverviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StreetDataOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
