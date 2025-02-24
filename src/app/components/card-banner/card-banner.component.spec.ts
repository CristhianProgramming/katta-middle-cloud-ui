import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBannerComponent } from './card-banner.component';

describe('CardBannerComponent', () => {
  let component: CardBannerComponent;
  let fixture: ComponentFixture<CardBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
