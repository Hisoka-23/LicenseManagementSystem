import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCustomerMisc2 } from './edit-customer-misc-2';

describe('EditCustomerMisc2', () => {
  let component: EditCustomerMisc2;
  let fixture: ComponentFixture<EditCustomerMisc2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCustomerMisc2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCustomerMisc2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
