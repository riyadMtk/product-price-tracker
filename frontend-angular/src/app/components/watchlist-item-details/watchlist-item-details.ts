import { Component, OnInit, ChangeDetectorRef } from '@angular/core';  // ← ajout
import { ActivatedRoute, Router } from '@angular/router';
import { WatchlistService } from '../../services/watchlist';
import { WatchlistItem } from '../../models/watchlist.model';

@Component({
  selector: 'app-watchlist-item-details',
  templateUrl: './watchlist-item-details.html',
  styleUrls: ['./watchlist-item-details.css'],
  standalone: false
})
export class WatchlistItemDetailsComponent implements OnInit {
  item: WatchlistItem | null = null;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private watchlistService: WatchlistService,
    private router: Router,
    private cdr: ChangeDetectorRef   // ← injection
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadItem(id);
    }
  }

  loadItem(id: string): void {
    this.loading = true;
    this.cdr.detectChanges(); // optionnel : pour que le chargement s'affiche immédiatement
    this.watchlistService.getById(id).subscribe({
      next: (data) => {
        this.item = data;
        this.loading = false;
        this.cdr.detectChanges();   // ← force la mise à jour de la vue
      },
      error: (err) => {
        console.error(err);
        alert('Erreur lors du chargement');
        this.loading = false;
        this.cdr.detectChanges();
        this.router.navigate(['/watchlist']);
      }
    });
  }
}