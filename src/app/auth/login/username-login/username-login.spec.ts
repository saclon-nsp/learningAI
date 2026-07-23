import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsernameLogin } from './username-login';

describe('UsernameLogin', () => {
  let component: UsernameLogin;
  let fixture: ComponentFixture<UsernameLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsernameLogin],
    }).compileComponents();

    fixture = TestBed.createComponent(UsernameLogin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
