import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryProductCardComponent } from './summary-product-card.component';

describe('SummaryProductCardComponent', () => {
  let component: SummaryProductCardComponent;
  let fixture: ComponentFixture<SummaryProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryProductCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SummaryProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
