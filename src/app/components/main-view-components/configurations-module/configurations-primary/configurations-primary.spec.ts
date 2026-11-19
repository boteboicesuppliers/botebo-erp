import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationsPrimary } from './configurations-primary';

describe('ConfigurationsPrimary', () => {
  let component: ConfigurationsPrimary;
  let fixture: ComponentFixture<ConfigurationsPrimary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigurationsPrimary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurationsPrimary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
