import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportProduct } from './support-product';

describe('SupportProduct', () => {
  let component: SupportProduct;
  let fixture: ComponentFixture<SupportProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportProduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
