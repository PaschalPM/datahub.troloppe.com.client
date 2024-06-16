import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaneNavigatorPanelComponent } from './pane-navigator-panel.component';

describe('PaneNavigatorPanelComponent', () => {
  let component: PaneNavigatorPanelComponent;
  let fixture: ComponentFixture<PaneNavigatorPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaneNavigatorPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaneNavigatorPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
