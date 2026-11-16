import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesPipeline } from './sales-pipeline';

describe('SalesPipeline', () => {
  let component: SalesPipeline;
  let fixture: ComponentFixture<SalesPipeline>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesPipeline]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesPipeline);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
