import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportFollowUp } from './support-follow-up';

describe('SupportFollowUp', () => {
  let component: SupportFollowUp;
  let fixture: ComponentFixture<SupportFollowUp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportFollowUp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportFollowUp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
