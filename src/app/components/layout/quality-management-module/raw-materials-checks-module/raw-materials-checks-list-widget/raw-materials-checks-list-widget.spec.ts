import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawMaterialsChecksListWidget } from './raw-materials-checks-list-widget';

describe('RawMaterialsChecksListWidget', () => {
  let component: RawMaterialsChecksListWidget;
  let fixture: ComponentFixture<RawMaterialsChecksListWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RawMaterialsChecksListWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawMaterialsChecksListWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
