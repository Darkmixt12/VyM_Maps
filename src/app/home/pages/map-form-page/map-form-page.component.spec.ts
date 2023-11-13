import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapFormPageComponent } from './map-form-page.component';

describe('MapFormPageComponent', () => {
  let component: MapFormPageComponent;
  let fixture: ComponentFixture<MapFormPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapFormPageComponent]
    });
    fixture = TestBed.createComponent(MapFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
