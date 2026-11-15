import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewWidgets } from './overview-widgets';

describe('OverviewWidgets', () => {
  let component: OverviewWidgets;
  let fixture: ComponentFixture<OverviewWidgets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewWidgets]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewWidgets);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
