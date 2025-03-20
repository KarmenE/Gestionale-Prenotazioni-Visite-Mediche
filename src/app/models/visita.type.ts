
export interface Visita {
    id: number;
    tipoVisita: string;
    descrizione: string;
    medico: string;
    durata: string;
    prezzo: number;
}
  
export interface VisitaDescrizione extends Visita {
    prestazioni: string[];
    medici: string[];
    telefono: string;
    orariSportello: string[];
}