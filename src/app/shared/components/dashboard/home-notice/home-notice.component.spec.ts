import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeNoticeComponent } from './home-notice.component';

describe('HomeNoticeComponent', () => {
  let component: HomeNoticeComponent;
  let fixture: ComponentFixture<HomeNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeNoticeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
