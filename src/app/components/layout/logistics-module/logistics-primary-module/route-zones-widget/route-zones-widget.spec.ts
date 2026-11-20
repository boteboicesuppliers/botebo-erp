import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteZonesWidget } from './route-zones-widget';

describe('RouteZonesWidget', () => {
  let component: RouteZonesWidget;
  let fixture: ComponentFixture<RouteZonesWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteZonesWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteZonesWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
