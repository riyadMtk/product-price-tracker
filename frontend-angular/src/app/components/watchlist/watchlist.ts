import { Component, OnInit, ChangeDetectorRef } from '@angular/core';  // ← ajout
import { WatchlistService } from '../../services/watchlist';
import { WatchlistItem } from '../../models/watchlist.model';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.html',
  styleUrls: ['./watchlist.css'],
  standalone: false
})
export class WatchlistComponent implements OnInit {
  items: WatchlistItem[] = [];
  loading = true;

  constructor(
    private watchlistService: WatchlistService,
    private cdr: ChangeDetectorRef   // ← injection
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.watchlistService.getAll().subscribe({
      next: (data) => {
        this.items = data;
        this.loading = false;
        this.cdr.detectChanges();    // ← force la mise à jour
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.cdr.detectChanges();
        alert('Erreur de chargement');
      }
    });
  }

  remove(id: string): void {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet élément de la watchlist ?')) {
    this.watchlistService.removeById(id).subscribe({
      next: () => this.load(),
      error: (err) => alert('Erreur : ' + err.error.message)
    });
  }
}
}