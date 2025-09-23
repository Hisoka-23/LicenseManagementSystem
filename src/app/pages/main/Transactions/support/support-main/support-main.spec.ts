import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportMain } from './support-main';

describe('SupportMain', () => {
  let component: SupportMain;
  let fixture: ComponentFixture<SupportMain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportMain]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportMain);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
