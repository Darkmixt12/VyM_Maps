import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VymPageComponent } from './vym-page.component';

describe('VymPageComponent', () => {
  let component: VymPageComponent;
  let fixture: ComponentFixture<VymPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VymPageComponent]
    });
    fixture = TestBed.createComponent(VymPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
