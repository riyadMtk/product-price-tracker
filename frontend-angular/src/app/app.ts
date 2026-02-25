import { Component } from '@angular/core';
import { AuthService } from './services/auth';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'frontend-angular';
  constructor(private authService: AuthService) {}

  logout(): void {
  if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
    this.authService.logout();
  }
}
}