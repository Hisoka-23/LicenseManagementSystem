import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallBox4 } from './small-box-4';

describe('SmallBox4', () => {
  let component: SmallBox4;
  let fixture: ComponentFixture<SmallBox4>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmallBox4]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallBox4);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
