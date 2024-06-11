import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadonlyInputFieldComponent } from './readonly-input-field.component';

describe('ReadonlyInputFieldComponent', () => {
  let component: ReadonlyInputFieldComponent;
  let fixture: ComponentFixture<ReadonlyInputFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadonlyInputFieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReadonlyInputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
