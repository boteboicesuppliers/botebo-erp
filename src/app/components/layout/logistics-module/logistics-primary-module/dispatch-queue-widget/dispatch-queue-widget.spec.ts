import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchQueueWidget } from './dispatch-queue-widget';

describe('DispatchQueueWidget', () => {
  let component: DispatchQueueWidget;
  let fixture: ComponentFixture<DispatchQueueWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DispatchQueueWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DispatchQueueWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
