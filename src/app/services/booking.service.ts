
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Disponibilita } from '../models/disponibilita.type';
import { catchError, from, map, Observable, switchMap, tap, throwError } from 'rxjs';
import { Prenotazione } from '../models/prenotazione.type';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getDisponibilitaByTipoVisita(tipoVisita: string): Observable<Disponibilita[]> {
    return this.http.get<Disponibilita[]>(`${this.apiUrl}/disponibilita?tipoVisita=${tipoVisita}`);
  }

  getPrenotazioniByUtente(utenteId: number): Observable<Prenotazione[]> {
    return this.http.get<Prenotazione[]>(`${this.apiUrl}/prenotazioni?utenteId=${utenteId}`);
  }
  
  createPrenotazione(prenotazione: { utenteId: number; tipoVisita: string; data: string; orario: string; note: string; }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/prenotazioni`, prenotazione);
  }

  getPrenotazioneById(id: number): Observable<Prenotazione> {
    return this.http.get<Prenotazione>(`${this.apiUrl}/prenotazioni/${id}`);
  }

  updatePrenotazione(prenotazione: Prenotazione): Observable<Prenotazione> {
    return this.http.put<Prenotazione>(`${this.apiUrl}/prenotazioni/${prenotazione.id}`, prenotazione);
  }

  deletePrenotazione(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/prenotazioni/${id}`);
  }
}
