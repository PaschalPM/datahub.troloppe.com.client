import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniDrawerComponent } from './mini-drawer.component';

describe('MiniDrawerComponent', () => {
  let component: MiniDrawerComponent;
  let fixture: ComponentFixture<MiniDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiniDrawerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiniDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
