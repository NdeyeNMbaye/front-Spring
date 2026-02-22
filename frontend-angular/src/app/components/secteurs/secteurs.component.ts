import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Secteur } from '../../models/models';

@Component({
  selector: 'app-secteurs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './secteurs.component.html'
})
export class SecteursComponent implements OnInit {
  secteurs: Secteur[] = [];
  loading = true;
  showModal = false;
  isEdit = false;
  saving = false;
  message = '';
  messageType = '';

  form: Secteur = { nom: '', description: '' };

  constructor(private api: ApiService) {}

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.api.getSecteurs().subscribe({
      next: (data) => { this.secteurs = Array.isArray(data) ? data : []; this.loading = false; },
      error: () => { this.loading = false; this.showMsg('Erreur chargement secteurs', 'danger'); }
    });
  }

  openAdd() {
    this.form = { nom: '', description: '' };
    this.isEdit = false;
    this.showModal = true;
  }

  openEdit(s: Secteur) {
    this.form = { ...s, nom: s.nom || s.name };
    this.isEdit = true;
    this.showModal = true;
  }

  save() {
    if (!this.form.nom) return;
    this.saving = true;
    const payload = { ...this.form, name: this.form.nom };
    const obs = this.isEdit && this.form.id
      ? this.api.updateSecteur(this.form.id, payload)
      : this.api.createSecteur(payload);

    obs.subscribe({
      next: () => {
        this.showModal = false;
        this.saving = false;
        this.showMsg(this.isEdit ? 'Secteur modifié !' : 'Secteur créé !', 'success');
        this.load();
      },
      error: () => { this.saving = false; this.showMsg('Erreur lors de la sauvegarde', 'danger'); }
    });
  }

  delete(s: Secteur) {
    if (!confirm(`Supprimer le secteur "${s.nom || s.name}" ?`)) return;
    this.api.deleteSecteur(s.id!).subscribe({
      next: () => { this.showMsg('Secteur supprimé', 'success'); this.load(); },
      error: () => this.showMsg('Erreur suppression', 'danger')
    });
  }

  showMsg(msg: string, type: string) {
    this.message = msg;
    this.messageType = type;
    setTimeout(() => this.message = '', 3000);
  }

  getName(s: Secteur) { return s.nom || s.name || '—'; }
}
