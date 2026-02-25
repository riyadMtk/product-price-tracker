import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';  // ← ajout
import { Subscription } from 'rxjs';
import { PriceService } from '../../services/price';
import { WatchlistService } from '../../services/watchlist';
import { SearchStateService } from '../../services/search-state';
import { Price } from '../../models/price.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.html',
  styleUrls: ['./search.css'],
  standalone: false
})
export class SearchComponent implements OnInit, OnDestroy {
  productName: string = '';
  prices: Price[] = [];
  loading = false;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private priceService: PriceService,
    private watchlistService: WatchlistService,
    private searchState: SearchStateService,
    private cdr: ChangeDetectorRef   // ← injection
  ) {}

  ngOnInit(): void {
    // Restaurer l'état précédent
    this.subscriptions.add(
      this.searchState.productName$.subscribe(name => {
        this.productName = name;
        this.cdr.detectChanges();   // ← force la mise à jour
      })
    );
    this.subscriptions.add(
      this.searchState.prices$.subscribe(prices => {
        this.prices = prices;
        this.cdr.detectChanges();   // ← force la mise à jour
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  search(): void {
    if (!this.productName) return;
    this.loading = true;
    this.priceService.search(this.productName).subscribe({
      next: (data) => {
        this.prices = data;
        this.loading = false;
        // Sauvegarder l'état
        this.searchState.setProductName(this.productName);
        this.searchState.setPrices(data);
        this.cdr.detectChanges();   // ← force la mise à jour
      },
      error: () => {
        alert('Erreur lors de la recherche');
        this.loading = false;
        this.cdr.detectChanges();   // ← optionnel mais sécuritaire
      }
    });
  }

  addToWatchlist(price: Price): void {
    const item = {
      productName: price.product_name,
      source: price.source,
      price: price.price_eur,
      currency: 'EUR',
      unit: price.unit
    };
    this.watchlistService.add(item).subscribe({
      next: () => alert('Offre ajoutée à la watchlist'),
      error: (err) => alert('Erreur : ' + err.error.message)
    });
  }
}