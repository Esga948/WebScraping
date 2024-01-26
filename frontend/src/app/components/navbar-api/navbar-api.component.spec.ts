import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarApiComponent } from './navbar-api.component';

describe('NavbarApiComponent', () => {
  let component: NavbarApiComponent;
  let fixture: ComponentFixture<NavbarApiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarApiComponent]
    });
    fixture = TestBed.createComponent(NavbarApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
