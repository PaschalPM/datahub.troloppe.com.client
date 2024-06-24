import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStreetDataComponent } from './new-street-data.component';

describe('NewStreetDataComponent', () => {
  let component: NewStreetDataComponent;
  let fixture: ComponentFixture<NewStreetDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewStreetDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewStreetDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
