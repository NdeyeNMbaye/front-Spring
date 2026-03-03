export interface Secteur {
  id?: number;
  name?: string;
  nom?: string;
  description?: string;
}

export interface Classe {
  id?: number;
  className: string;
  description: string;
  idSector: number;
  sectorName?: string;
}
