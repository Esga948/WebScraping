import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnArribaComponent } from './BtnArribaComponent';

describe('BtnArribaComponent', () => {
  let component: BtnArribaComponent;
  let fixture: ComponentFixture<BtnArribaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BtnArribaComponent]
    });
    fixture = TestBed.createComponent(BtnArribaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
