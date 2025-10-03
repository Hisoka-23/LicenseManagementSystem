import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallBox3 } from './small-box-3';

describe('SmallBox3', () => {
  let component: SmallBox3;
  let fixture: ComponentFixture<SmallBox3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmallBox3]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallBox3);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
