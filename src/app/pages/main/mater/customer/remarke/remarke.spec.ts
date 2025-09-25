import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Remarke } from './remarke';

describe('Remarke', () => {
  let component: Remarke;
  let fixture: ComponentFixture<Remarke>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Remarke]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Remarke);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
