import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Classe, Secteur } from '../../models/models';

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './classes.component.html'
})
export class ClassesComponent implements OnInit {
  classes: Classe[] = [];
  secteurs: Secteur[] = [];
  loading = true;
  showModal = false;
  isEdit = false;
  saving = false;
  message = '';
  messageType = '';

  form: any = { nom: '', sectorId: null };

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.load();
    this.loadSecteurs();
  }

  load() {
    this.loading = true;
    this.api.getClasses().subscribe({
      next: (data) => { this.classes = Array.isArray(data) ? data : []; this.loading = false; },
      error: () => { this.loading = false; this.showMsg('Erreur chargement classes', 'danger'); }
    });
  }

  loadSecteurs() {
    this.api.getSecteurs().subscribe({
      next: (data) => { this.secteurs = Array.isArray(data) ? data : []; }
    });
  }

  openAdd() {
    this.form = { nom: '', sectorId: null };
    this.isEdit = false;
    this.showModal = true;
  }

  openEdit(c: Classe) {
    this.form = {
      id: c.id,
      nom: c.nom || c.name,
      sectorId: c.secteur?.id || c.sector?.id || null
    };
    this.isEdit = true;
    this.showModal = true;
  }

  save() {
    if (!this.form.nom) return;
    this.saving = true;

    const payload: Classe = {
      nom: this.form.nom,
      name: this.form.nom,
      secteur: this.form.sectorId ? { id: parseInt(this.form.sectorId) } : undefined,
      sector: this.form.sectorId ? { id: parseInt(this.form.sectorId) } : undefined,
      sectorId: this.form.sectorId ? parseInt(this.form.sectorId) : undefined
    };

    const obs = this.isEdit && this.form.id
      ? this.api.updateClasse(this.form.id, payload)
      : this.api.createClasse(payload);

    obs.subscribe({
      next: () => {
        this.showModal = false;
        this.saving = false;
        this.showMsg(this.isEdit ? 'Classe modifiée !' : 'Classe créée !', 'success');
        this.load();
      },
      error: () => { this.saving = false; this.showMsg('Erreur lors de la sauvegarde', 'danger'); }
    });
  }

  delete(c: Classe) {
    if (!confirm(`Supprimer la classe "${c.nom || c.name}" ?`)) return;
    this.api.deleteClasse(c.id!).subscribe({
      next: () => { this.showMsg('Classe supprimée', 'success'); this.load(); },
      error: () => this.showMsg('Erreur suppression', 'danger')
    });
  }

  getSecteurName(c: Classe): string {
    const s = c.secteur || c.sector;
    return s ? (s.nom || s.name || '—') : '—';
  }

  getName(c: Classe): string { return c.nom || c.name || '—'; }

  getSecteurNom(s: Secteur): string { return s.nom || s.name || '—'; }

  showMsg(msg: string, type: string) {
    this.message = msg;
    this.messageType = type;
    setTimeout(() => this.message = '', 3000);
  }
}
