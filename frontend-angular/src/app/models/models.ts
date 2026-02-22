export interface Secteur {
  id?: number;
  nom?: string;
  name?: string;
  description?: string;
}

export interface Classe {
  id?: number;
  nom?: string;
  name?: string;
  secteur?: Secteur;
  sector?: Secteur;
  sectorId?: number;
}
