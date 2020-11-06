import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersWithRainComponent } from './customers-with-rain.component';

describe('CustomersWithRainComponent', () => {
  let component: CustomersWithRainComponent;
  let fixture: ComponentFixture<CustomersWithRainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersWithRainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersWithRainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
