import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingPrimary } from './accounting-primary';

describe('AccountingPrimary', () => {
  let component: AccountingPrimary;
  let fixture: ComponentFixture<AccountingPrimary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountingPrimary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountingPrimary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
