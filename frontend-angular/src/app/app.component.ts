import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  template: `
    <div class="app-layout" *ngIf="isLoggedIn(); else loginPage">
      <app-navbar></app-navbar>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
    </div>
    <ng-template #loginPage>
      <router-outlet></router-outlet>
    </ng-template>
  `
})
export class AppComponent {
  constructor(private auth: AuthService) {}
  isLoggedIn() { return this.auth.isLoggedIn(); }
}
