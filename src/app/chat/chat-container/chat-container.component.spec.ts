import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatContainerComponent } from './chat-container.component';

describe('ChatContainerComponent', () => {
  let component: ChatContainerComponent;
  let fixture: ComponentFixture<ChatContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChatContainerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
