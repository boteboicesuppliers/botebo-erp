import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsPrimary } from './reports-primary';

describe('ReportsPrimary', () => {
  let component: ReportsPrimary;
  let fixture: ComponentFixture<ReportsPrimary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsPrimary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsPrimary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
