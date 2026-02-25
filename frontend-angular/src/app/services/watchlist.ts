import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WatchlistItem } from '../models/watchlist.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private apiUrl = `${environment.apiUrl}/watchlist`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<WatchlistItem[]> {
    return this.http.get<WatchlistItem[]>(this.apiUrl);
  }

  // Nouvelle méthode pour récupérer un élément par ID
  getById(id: string): Observable<WatchlistItem> {
    return this.http.get<WatchlistItem>(`${this.apiUrl}/${id}`);
  }

  // Ajout avec détails optionnels
  add(item: { productName: string; source?: string; price?: number; currency?: string; unit?: string }): Observable<WatchlistItem> {
    return this.http.post<WatchlistItem>(this.apiUrl, item);
  }

  remove(productName: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${productName}`);
  }

  removeById(id: string): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`);
  }
}