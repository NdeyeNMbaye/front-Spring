import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {
    if (this.auth.isLoggedIn()) this.router.navigate(['/dashboard']);
  }

  login() {
    this.error = '';
    this.loading = true;
    setTimeout(() => {
      if (this.auth.login(this.username, this.password)) {
        this.router.navigate(['/dashboard']);
      } else {
        this.error = 'Identifiants incorrects. Essayez admin/admin123';
      }
      this.loading = false;
    }, 600);
  }
}
