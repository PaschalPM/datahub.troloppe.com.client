import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninOrDashboardLinkComponent } from './signin-or-dashboard-link.component';

describe('SigninOrDashboardLinkComponent', () => {
  let component: SigninOrDashboardLinkComponent;
  let fixture: ComponentFixture<SigninOrDashboardLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SigninOrDashboardLinkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SigninOrDashboardLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
