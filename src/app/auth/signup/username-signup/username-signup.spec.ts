import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsernameSignup } from './username-signup';

describe('UsernameSignup', () => {
  let component: UsernameSignup;
  let fixture: ComponentFixture<UsernameSignup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsernameSignup],
    }).compileComponents();

    fixture = TestBed.createComponent(UsernameSignup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
