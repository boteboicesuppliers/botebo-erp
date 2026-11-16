import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationsListWidget } from './quotations-list-widget';

describe('QuotationsListWidget', () => {
  let component: QuotationsListWidget;
  let fixture: ComponentFixture<QuotationsListWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuotationsListWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotationsListWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
