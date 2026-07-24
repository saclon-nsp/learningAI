import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSociety } from './create-society';

describe('CreateSociety', () => {
  let component: CreateSociety;
  let fixture: ComponentFixture<CreateSociety>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSociety],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateSociety);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
