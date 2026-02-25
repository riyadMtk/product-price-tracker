import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PriceService } from '../../services/price';
import { WatchlistService } from '../../services/watchlist';
import { Price } from '../../models/price.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.css'],
  standalone: false
})
export class ProductDetailsComponent implements OnInit {
  productName: string = '';
  prices: Price[] = [];
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private priceService: PriceService,
    private watchlistService: WatchlistService,
    private cdr: ChangeDetectorRef   // ← injection
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productName = params['productName'];
      if (this.productName) {
        this.search();
      }
    });
  }

  search(): void {
  this.loading = true;
  this.cdr.detectChanges(); // affiche "Chargement..."
  this.priceService.search(this.productName).subscribe({
    next: (data) => {
      console.log('Données reçues:', data);
      // Utiliser setTimeout pour s'assurer que le changement est détecté
      setTimeout(() => {
        this.prices = data;
        this.loading = false;
        this.cdr.detectChanges();
      });
    },
    error: (err) => {
      console.error(err);
      setTimeout(() => {
        this.loading = false;
        this.cdr.detectChanges();
        alert('Erreur lors de la récupération des détails');
      });
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