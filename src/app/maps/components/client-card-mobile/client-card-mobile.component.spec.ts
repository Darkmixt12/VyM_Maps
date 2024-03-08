import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCardMobileComponent } from './client-card-mobile.component';

describe('ClientCardMobileComponent', () => {
  let component: ClientCardMobileComponent;
  let fixture: ComponentFixture<ClientCardMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientCardMobileComponent]
    });
    fixture = TestBed.createComponent(ClientCardMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
