import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiDeComponent } from './api-de.component';

describe('ApiDeComponent', () => {
  let component: ApiDeComponent;
  let fixture: ComponentFixture<ApiDeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApiDeComponent]
    });
    fixture = TestBed.createComponent(ApiDeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
