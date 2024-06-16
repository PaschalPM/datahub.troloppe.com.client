import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewNavigatorComponent } from './overview-navigator.component';

describe('OverviewNavigatorComponent', () => {
  let component: OverviewNavigatorComponent;
  let fixture: ComponentFixture<OverviewNavigatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewNavigatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverviewNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
