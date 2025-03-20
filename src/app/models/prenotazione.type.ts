
export interface Prenotazione {
    id: number;
    utenteId: number;
    tipoVisita: string;
    data: string;      
    orario: string;   
    note?: string;    
  }
  