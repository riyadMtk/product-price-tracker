import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchlistItemDetails } from './watchlist-item-details';

describe('WatchlistItemDetails', () => {
  let component: WatchlistItemDetails;
  let fixture: ComponentFixture<WatchlistItemDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WatchlistItemDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchlistItemDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
