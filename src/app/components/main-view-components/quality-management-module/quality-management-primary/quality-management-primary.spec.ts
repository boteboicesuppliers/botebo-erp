import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityManagementPrimary } from './quality-management-primary';

describe('QualityManagementPrimary', () => {
  let component: QualityManagementPrimary;
  let fixture: ComponentFixture<QualityManagementPrimary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualityManagementPrimary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualityManagementPrimary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
