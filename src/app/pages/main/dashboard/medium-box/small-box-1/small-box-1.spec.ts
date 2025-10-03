import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallBox1 } from './small-box-1';

describe('SmallBox1', () => {
  let component: SmallBox1;
  let fixture: ComponentFixture<SmallBox1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmallBox1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallBox1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
