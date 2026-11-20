import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawMaterialsAndPackaging } from './raw-materials-and-packaging';

describe('RawMaterialsAndPackaging', () => {
  let component: RawMaterialsAndPackaging;
  let fixture: ComponentFixture<RawMaterialsAndPackaging>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RawMaterialsAndPackaging]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawMaterialsAndPackaging);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
