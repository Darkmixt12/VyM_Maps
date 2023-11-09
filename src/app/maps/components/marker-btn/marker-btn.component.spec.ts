import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkerBtnComponent } from './marker-btn.component';

describe('MarkerBtnComponent', () => {
  let component: MarkerBtnComponent;
  let fixture: ComponentFixture<MarkerBtnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarkerBtnComponent]
    });
    fixture = TestBed.createComponent(MarkerBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
