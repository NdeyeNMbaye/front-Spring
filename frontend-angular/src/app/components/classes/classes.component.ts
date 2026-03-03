import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Classe, Secteur } from '../../models/models';

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-header">
      <div>
        <h1>Classes</h1>
        <p>Gestion des classes acad├®miques</p>
      </div>
      <button class="btn-primary" (click)="openAdd()">+ Ajouter</button>
    </div>

    <div *ngIf="error" class="alert-error">{{ error }}</div>

    <div class="card" *ngIf="classes.length === 0">
      <div class="empty-state">
        <span class="empty-icon">Ý</span>
        <p>Aucune classe trouv│Üe</p>
        <button class="btn-primary" (click)="openAdd()">Ajouter la premi├®├¿re classe</button>
      </div>
    </div>

    <div class="table-container" *ngIf="classes.length > 0">
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Description</th>
            <th>Secteur</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let c of classes">
            <td>{{ c.className }}</td>
            <td>{{ c.description }}</td>
            <td>{{ c.sectorName || 'ÔÇö' }}</td>
            <td>
              <button class="btn-edit" (click)="openEdit(c)">Modifier</button>
              <button class="btn-delete" (click)="delete(c)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="modal" *ngIf="showModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>{{ editMode ? 'Modifier' : 'Nouvelle' }} classe</h2>
          <button (click)="closeModal()">Ô£ò</button>
        </div>
        <div class="modal-body">
          <label>Nom de la classe *</label>
          <input [(ngModel)]="form.className" placeholder="Ex: L1 Informatique" />
          <label>Description *</label>
          <textarea [(ngModel)]="form.description" placeholder="Description de la classe..."></textarea>
          <label>Secteur</label>
          <select [(ngModel)]="form.idSector">
            <option *ngFor="let s of secteurs" [value]="s.id">{{ s.name || s.nom }}</option>
          </select>
        </div>
        <div class="modal-footer">
          <button class="btn-cancel" (click)="closeModal()">Annuler</button>
          <button class="btn-primary" (click)="save()">Enregistrer</button>
        </div>
      </div>
    </div>
  `
})
export class ClassesComponent implements OnInit {
  classes: Classe[] = [];
  secteurs: Secteur[] = [];
  showModal = false;
  editMode = false;
  error = '';
  form: Classe = { className: '', description: '', idSector: 0 };

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.load();
    this.api.getSecteurs().subscribe(s => this.secteurs = s);
  }

  load() {
    this.api.getClasses().subscribe({
      next: c => this.classes = c,
      error: () => this.error = 'Erreur de chargement'
    });
  }

  openAdd() {
    this.form = { className: '', description: '', idSector: this.secteurs[0]?.id || 0 };
    this.editMode = false;
    this.showModal = true;
  }

  openEdit(c: Classe) {
    this.form = { ...c };
    this.editMode = true;
    this.showModal = true;
  }

  save() {
    if (this.editMode && this.form.id) {
      this.api.updateClasse(this.form.id, this.form).subscribe({
        next: () => { this.load(); this.closeModal(); },
        error: () => this.error = 'Erreur lors de la sauvegarde'
      });
    } else {
      this.api.createClasse(this.form).subscribe({
        next: () => { this.load(); this.closeModal(); },
        error: () => this.error = 'Erreur lors de la sauvegarde'
      });
    }
  }

  delete(c: Classe) {
    if (!confirm(`Supprimer la classe "${c.className}" ?`)) return;
    this.api.deleteClasse(c.id!).subscribe(() => this.load());
  }

  closeModal() { this.showModal = false; this.error = ''; }
}
