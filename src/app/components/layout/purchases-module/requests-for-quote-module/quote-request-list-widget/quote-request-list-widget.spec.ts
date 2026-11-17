import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteRequestListWidget } from './quote-request-list-widget';

describe('QuoteRequestListWidget', () => {
  let component: QuoteRequestListWidget;
  let fixture: ComponentFixture<QuoteRequestListWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteRequestListWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuoteRequestListWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
