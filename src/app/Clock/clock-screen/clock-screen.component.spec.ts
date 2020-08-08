import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockScreenComponent } from './clock-screen.component';

describe('ClockScreenComponent', () => {
  let component: ClockScreenComponent;
  let fixture: ComponentFixture<ClockScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClockScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClockScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
