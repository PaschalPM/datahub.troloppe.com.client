import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthNoticeComponent } from './auth-notice.component';

describe('AuthNoticeComponent', () => {
  let component: AuthNoticeComponent;
  let fixture: ComponentFixture<AuthNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthNoticeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
