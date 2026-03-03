import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Secteur, Classe } from '../models/models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // ÔöÇÔöÇÔöÇ SECTEURS ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ
  getSecteurs(): Observable<Secteur[]> {
    return this.http.get<Secteur[]>(`${this.baseUrl}/sectors/api/sectors`);
  }

  createSecteur(s: Secteur): Observable<Secteur> {
    return this.http.post<Secteur>(`${this.baseUrl}/sectors/api/sectors`, s);
  }

  updateSecteur(id: number, s: Secteur): Observable<Secteur> {
    return this.http.put<Secteur>(`${this.baseUrl}/sectors/api/sectors/${id}`, s);
  }

  deleteSecteur(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/sectors/api/sectors/${id}`);
  }

  // ÔöÇÔöÇÔöÇ CLASSES ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ
  getClasses(): Observable<Classe[]> {
    return this.http.get<Classe[]>(`${this.baseUrl}/classes/api/classes`);
  }

  createClasse(c: Classe): Observable<Classe> {
    return this.http.post<Classe>(`${this.baseUrl}/classes/api/classes`, c);
  }

  updateClasse(id: number, c: Classe): Observable<Classe> {
    return this.http.put<Classe>(`${this.baseUrl}/classes/api/classes/${id}`, c);
  }

  deleteClasse(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/classes/api/classes/${id}`);
  }

  // ÔöÇÔöÇÔöÇ STATUS ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ
  checkStatus(): Observable<any> {
    return this.http.get(`${this.baseUrl}/sectors/api/sectors`).pipe(
        catchError(() => of(null))
    );
  }
}
