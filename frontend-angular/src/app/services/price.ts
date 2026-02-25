import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Price } from '../models/price.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  private apiUrl = `${environment.apiUrl}/prices`;

  constructor(private http: HttpClient) {}

  search(product: string): Observable<Price[]> {
    console.log('🔍 Appel API pour produit:', product);
    return this.http.get<Price[]>(`${this.apiUrl}/search`, { params: { product } }).pipe(
      tap(data => console.log('✅ Données reçues du backend:', data)),
      catchError(err => {
        console.error('❌ Erreur HTTP dans le service:', err);
        throw err;
      })
    );
  }
}