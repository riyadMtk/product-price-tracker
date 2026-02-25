import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Price } from '../models/price.model';

@Injectable({
  providedIn: 'root'
})
export class SearchStateService {
  private productNameSubject = new BehaviorSubject<string>('');
  private pricesSubject = new BehaviorSubject<Price[]>([]);

  productName$ = this.productNameSubject.asObservable();
  prices$ = this.pricesSubject.asObservable();

  setProductName(name: string) {
    this.productNameSubject.next(name);
  }

  setPrices(prices: Price[]) {
    this.pricesSubject.next(prices);
  }

  clear() {
    this.productNameSubject.next('');
    this.pricesSubject.next([]);
  }
}