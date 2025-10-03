import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainVerticalBarChart } from './main-vertical-bar-chart';

describe('MainVerticalBarChart', () => {
  let component: MainVerticalBarChart;
  let fixture: ComponentFixture<MainVerticalBarChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainVerticalBarChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainVerticalBarChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
