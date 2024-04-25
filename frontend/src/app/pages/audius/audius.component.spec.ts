import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudiusComponent } from './audius.component';

describe('AudiusComponent', () => {
  let component: AudiusComponent;
  let fixture: ComponentFixture<AudiusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AudiusComponent]
    });
    fixture = TestBed.createComponent(AudiusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
