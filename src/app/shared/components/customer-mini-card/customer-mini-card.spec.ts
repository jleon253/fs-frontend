import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerMiniCard } from './customer-mini-card';

describe('CustomerMiniCard', () => {
  let component: CustomerMiniCard;
  let fixture: ComponentFixture<CustomerMiniCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerMiniCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerMiniCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
