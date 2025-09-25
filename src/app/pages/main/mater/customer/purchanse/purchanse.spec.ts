import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Purchanse } from './purchanse';

describe('Purchanse', () => {
  let component: Purchanse;
  let fixture: ComponentFixture<Purchanse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Purchanse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Purchanse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
