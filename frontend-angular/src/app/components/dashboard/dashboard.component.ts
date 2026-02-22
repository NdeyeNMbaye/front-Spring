import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  totalSecteurs = 0;
  totalClasses = 0;
  loading = true;
  user: any;

  constructor(private api: ApiService, private auth: AuthService) {}

  ngOnInit() {
    this.user = this.auth.getUser();
    this.loadStats();
  }

  loadStats() {
    this.loading = true;
    this.api.getSecteurs().subscribe({
      next: (data) => {
        this.totalSecteurs = Array.isArray(data) ? data.length : 0;
        this.api.getClasses().subscribe({
          next: (classes) => {
            this.totalClasses = Array.isArray(classes) ? classes.length : 0;
            this.loading = false;
          },
          error: () => { this.loading = false; }
        });
      },
      error: () => { this.loading = false; }
    });
  }
}
