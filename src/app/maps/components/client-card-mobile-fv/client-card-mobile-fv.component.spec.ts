import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCardMobileFvComponent } from './client-card-mobile-fv.component';

describe('ClientCardMobielFvComponent', () => {
  let component: ClientCardMobileFvComponent;
  let fixture: ComponentFixture<ClientCardMobileFvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientCardMobileFvComponent]
    });
    fixture = TestBed.createComponent(ClientCardMobileFvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
