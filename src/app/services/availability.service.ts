
import { Injectable } from '@angular/core';
import { Disponibilita } from '../models/disponibilita.type';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // recupera la disponibilità per il tipo di visita e data (in caso ce ne siano più, ne usa il primo)
  getDisponibilita(tipoVisita: string, data: string): Observable<Disponibilita | undefined> {
    return this.http.get<Disponibilita[]>(`${this.apiUrl}/disponibilita?tipoVisita=${tipoVisita}&data=${data}`)
      .pipe(
        map(list => list.length > 0 ? list[0] : undefined)
      );
  }

  // aggiorna una voce di disponibilità (PUT su json-server)
  updateDisponibilita(disponibilita: Disponibilita): Observable<Disponibilita> {
    return this.http.put<Disponibilita>(`${this.apiUrl}/disponibilita/${disponibilita.id}`, disponibilita);
  }

  // rimuove un orario dalla disponibilità
  removeOrarioDisponibilita(availabilityId: number, orario: string): Observable<Disponibilita> {
    return this.http.get<Disponibilita>(`${this.apiUrl}/disponibilita/${availabilityId}`)
      .pipe(
        switchMap(disponibilita => {
          console.log('Disponibilità prima della rimozione:', disponibilita);
          const index = disponibilita.orariDisponibili.indexOf(orario);
          if (index > -1) {
            disponibilita.orariDisponibili.splice(index, 1);
          }
          console.log('Disponibilità dopo la rimozione:', disponibilita);
          return this.updateDisponibilita(disponibilita);
        })
      );
  }

  // ripristina un orario in una voce di disponibilità (se non presente)
  restoreOrarioDisponibilita(tipoVisita: string, data: string, orario: string): Observable<Disponibilita | null> {
    return this.getDisponibilita(tipoVisita, data)
      .pipe(
        switchMap(disponibilita => {
          if (disponibilita) {
            if (!disponibilita.orariDisponibili.includes(orario)) {
              disponibilita.orariDisponibili.push(orario);
            }
            return this.updateDisponibilita(disponibilita);
          }
          return of(null);
        })
      );
  }

  getAvailabilityByTipoVisita(tipoVisita: string): Observable<Disponibilita[]> {
    return this.http.get<Disponibilita[]>(`${this.apiUrl}/disponibilita?tipoVisita=${tipoVisita}`);
  }
}
