import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStreetDataComponent } from './edit-street-data.component';

describe('EditStreetDataComponent', () => {
  let component: EditStreetDataComponent;
  let fixture: ComponentFixture<EditStreetDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditStreetDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditStreetDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
