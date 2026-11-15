import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedQueryForm } from './advanced-query-form';

describe('AdvancedQueryForm', () => {
  let component: AdvancedQueryForm;
  let fixture: ComponentFixture<AdvancedQueryForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvancedQueryForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvancedQueryForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});