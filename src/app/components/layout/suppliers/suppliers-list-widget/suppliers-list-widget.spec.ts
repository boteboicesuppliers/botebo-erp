import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersListWidget } from './suppliers-list-widget';

describe('SuppliersListWidget', () => {
  let component: SuppliersListWidget;
  let fixture: ComponentFixture<SuppliersListWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuppliersListWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppliersListWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
