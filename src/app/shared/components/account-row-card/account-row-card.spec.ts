import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountRowCard } from './account-row-card';

describe('AccountRowCard', () => {
  let component: AccountRowCard;
  let fixture: ComponentFixture<AccountRowCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountRowCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountRowCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
