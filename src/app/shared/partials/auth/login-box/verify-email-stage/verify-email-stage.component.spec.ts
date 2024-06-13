import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyEmailStageComponent } from './verify-email-stage.component';

describe('VerifyEmailStageComponent', () => {
  let component: VerifyEmailStageComponent;
  let fixture: ComponentFixture<VerifyEmailStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyEmailStageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerifyEmailStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
