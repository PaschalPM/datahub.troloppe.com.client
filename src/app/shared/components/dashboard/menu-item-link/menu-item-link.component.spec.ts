import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemLinkComponent } from './menu-item-link.component';

describe('MenuItemLinkComponent', () => {
  let component: MenuItemLinkComponent;
  let fixture: ComponentFixture<MenuItemLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuItemLinkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuItemLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
