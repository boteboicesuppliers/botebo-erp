import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawMaterialsChecks } from './raw-materials-checks';

describe('RawMaterialsChecks', () => {
  let component: RawMaterialsChecks;
  let fixture: ComponentFixture<RawMaterialsChecks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RawMaterialsChecks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawMaterialsChecks);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
