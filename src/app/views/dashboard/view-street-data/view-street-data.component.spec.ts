import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStreetDataComponent } from './view-street-data.component';

describe('ViewStreetDataComponent', () => {
  let component: ViewStreetDataComponent;
  let fixture: ComponentFixture<ViewStreetDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewStreetDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewStreetDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
