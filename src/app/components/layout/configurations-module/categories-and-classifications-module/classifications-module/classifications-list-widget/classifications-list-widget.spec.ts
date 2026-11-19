import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationsListWidget } from './classifications-list-widget';

describe('ClassificationsListWidget', () => {
  let component: ClassificationsListWidget;
  let fixture: ComponentFixture<ClassificationsListWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassificationsListWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassificationsListWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
