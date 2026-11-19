import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalsListWidget } from './journals-list-widget';

describe('JournalsListWidget', () => {
  let component: JournalsListWidget;
  let fixture: ComponentFixture<JournalsListWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JournalsListWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JournalsListWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
