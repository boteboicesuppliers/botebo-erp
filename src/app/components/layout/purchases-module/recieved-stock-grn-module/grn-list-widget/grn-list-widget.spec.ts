import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrnListWidget } from './grn-list-widget';

describe('GrnListWidget', () => {
  let component: GrnListWidget;
  let fixture: ComponentFixture<GrnListWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrnListWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrnListWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
