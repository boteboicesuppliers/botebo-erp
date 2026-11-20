import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsListWidget } from './locations-list-widget';

describe('LocationsListWidget', () => {
  let component: LocationsListWidget;
  let fixture: ComponentFixture<LocationsListWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationsListWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationsListWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
