import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  user: any;
  apiOnline = false;

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.auth.getUser();
    this.checkApi();
    setInterval(() => this.checkApi(), 15000);
  }

  checkApi() {
    this.api.checkStatus().subscribe({
      next: (r) => { this.apiOnline = r !== null; },
      error: () => { this.apiOnline = false; }
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
