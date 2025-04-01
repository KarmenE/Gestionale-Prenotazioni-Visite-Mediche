
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Disponibilita } from '../models/disponibilita.type';
import { catchError, from, map, Observable, switchMap, tap, throwError } from 'rxjs';
import { Prenotazione } from '../models/prenotazione.type';
import { EmailService } from './email.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private emailService: EmailService) { }

  getDisponibilitaByTipoVisita(tipoVisita: string): Observable<Disponibilita[]> {
    return this.http.get<Disponibilita[]>(`${this.apiUrl}/disponibilita?tipoVisita=${tipoVisita}`);
  }

  getPrenotazioniByUtente(utenteId: number): Observable<Prenotazione[]> {
    return this.http.get<Prenotazione[]>(`${this.apiUrl}/prenotazioni?utenteId=${utenteId}`);
  }
  
  createPrenotazione(prenotazione: { utenteId: number; tipoVisita: string; data: string; orario: string; note: string; }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/prenotazioni`, prenotazione);
  }

  //x emailJS
  // createPrenotazione(prenotazione: Prenotazione, userEmail: string): Observable<any> {

  //   console.log('🟢 Metodo createPrenotazione chiamato!');
  //   console.log('Prenotazione:', prenotazione);
  //   console.log('User Email:', userEmail);
  
  //   return this.http.post<any>(`${this.apiUrl}/prenotazioni`, prenotazione).pipe(
  //     tap(response => console.log('🟢 Risposta dal backend:', response)),
  //     switchMap(response => {
  //       console.log('📧 Invio email di conferma a:', userEmail);


  //       return this.emailService.sendConfirmationEmail(userEmail, prenotazione);
  //     }),
  //     catchError(error => {
  //       console.error('🔴 Errore nella richiesta HTTP:', error);
  //       return throwError(() => error);
  //     })
  //   );
  // }
  
  


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
