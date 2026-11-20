import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawMaterialsAndPackagingListWidget } from './raw-materials-and-packaging-list-widget';

describe('RawMaterialsAndPackagingListWidget', () => {
  let component: RawMaterialsAndPackagingListWidget;
  let fixture: ComponentFixture<RawMaterialsAndPackagingListWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RawMaterialsAndPackagingListWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawMaterialsAndPackagingListWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
