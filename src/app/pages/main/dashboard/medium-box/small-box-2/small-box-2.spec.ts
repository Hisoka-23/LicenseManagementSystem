import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallBox2 } from './small-box-2';

describe('SmallBox2', () => {
  let component: SmallBox2;
  let fixture: ComponentFixture<SmallBox2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmallBox2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallBox2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
