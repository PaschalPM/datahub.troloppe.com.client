import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorSchemeModalComponent } from './color-scheme-modal.component';

describe('ColorSchemeModalComponent', () => {
  let component: ColorSchemeModalComponent;
  let fixture: ComponentFixture<ColorSchemeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorSchemeModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColorSchemeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
