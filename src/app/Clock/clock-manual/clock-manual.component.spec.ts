import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockManualComponent } from './clock-manual.component';

describe('ClockManualComponent', () => {
  let component: ClockManualComponent;
  let fixture: ComponentFixture<ClockManualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClockManualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClockManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
