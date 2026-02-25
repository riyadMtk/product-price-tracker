import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  standalone: false,
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  user: User = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.register(this.user).subscribe({
      next: () => this.router.navigate(['/search']),
      error: (err) => alert('Erreur d\'inscription : ' + err.error.message)
    });
  }
}