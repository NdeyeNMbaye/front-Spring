import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly KEY = 'isi_auth';

  login(username: string, password: string): boolean {
    // Authentification simple (à remplacer par une vraie API)
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem(this.KEY, JSON.stringify({ username, role: 'ADMIN' }));
      return true;
    }
    if (username === 'user' && password === 'user123') {
      localStorage.setItem(this.KEY, JSON.stringify({ username, role: 'USER' }));
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.KEY);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.KEY);
  }

  getUser(): any {
    const data = localStorage.getItem(this.KEY);
    return data ? JSON.parse(data) : null;
  }
}
