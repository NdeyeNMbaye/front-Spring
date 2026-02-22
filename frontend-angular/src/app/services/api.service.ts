import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Secteur, Classe } from '../models/models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // ─── SECTEURS ────────────────────────────────────────────
  getSecteurs(): Observable<Secteur[]> {
    return this.http.get<Secteur[]>(`${this.baseUrl}/api/sectors`).pipe(
      catchError(() => this.http.get<Secteur[]>(`${this.baseUrl}/api/secteurs`))
    );
  }

  createSecteur(s: Secteur): Observable<Secteur> {
    return this.http.post<Secteur>(`${this.baseUrl}/api/sectors`, s).pipe(
      catchError(() => this.http.post<Secteur>(`${this.baseUrl}/api/secteurs`, s))
    );
  }

  updateSecteur(id: number, s: Secteur): Observable<Secteur> {
    return this.http.put<Secteur>(`${this.baseUrl}/api/sectors/${id}`, s).pipe(
      catchError(() => this.http.put<Secteur>(`${this.baseUrl}/api/secteurs/${id}`, s))
    );
  }

  deleteSecteur(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/sectors/${id}`).pipe(
      catchError(() => this.http.delete(`${this.baseUrl}/api/secteurs/${id}`))
    );
  }

  // ─── CLASSES ─────────────────────────────────────────────
  getClasses(): Observable<Classe[]> {
    return this.http.get<Classe[]>(`${this.baseUrl}/api/classes`).pipe(
      catchError(() => this.http.get<Classe[]>(`${this.baseUrl}/api/classe`))
    );
  }

  createClasse(c: Classe): Observable<Classe> {
    return this.http.post<Classe>(`${this.baseUrl}/api/classes`, c).pipe(
      catchError(() => this.http.post<Classe>(`${this.baseUrl}/api/classe`, c))
    );
  }

  updateClasse(id: number, c: Classe): Observable<Classe> {
    return this.http.put<Classe>(`${this.baseUrl}/api/classes/${id}`, c).pipe(
      catchError(() => this.http.put<Classe>(`${this.baseUrl}/api/classe/${id}`, c))
    );
  }

  deleteClasse(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/classes/${id}`).pipe(
      catchError(() => this.http.delete(`${this.baseUrl}/api/classe/${id}`))
    );
  }

  // ─── STATUS ──────────────────────────────────────────────
  checkStatus(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/sectors`).pipe(
      catchError(() => of(null))
    );
  }
}
