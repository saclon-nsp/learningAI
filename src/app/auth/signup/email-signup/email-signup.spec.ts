import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSignup } from './email-signup';

describe('EmailSignup', () => {
  let component: EmailSignup;
  let fixture: ComponentFixture<EmailSignup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailSignup],
    }).compileComponents();

    fixture = TestBed.createComponent(EmailSignup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
