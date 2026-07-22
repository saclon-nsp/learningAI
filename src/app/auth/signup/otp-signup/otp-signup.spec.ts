import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpSignup } from './otp-signup';

describe('OtpSignup', () => {
  let component: OtpSignup;
  let fixture: ComponentFixture<OtpSignup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtpSignup],
    }).compileComponents();

    fixture = TestBed.createComponent(OtpSignup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
