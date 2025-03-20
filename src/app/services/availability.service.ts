// //prima di aggiungere eliminazione visita dalla lista disponibilita e aggiornamento lista visite prenotate in caso di modifica visita - tutto funzionante

// import { Injectable } from '@angular/core';
// import { Disponibilita } from '../models/disponibilita.type';
// import { BehaviorSubject, Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AvailabilityService {

//   private availabilityList: Disponibilita[] = [
//     { id: 1, tipoVisita: 'Cardiologia', data: '2025-02-20', orario: [], orariDisponibili: ['09:00', '11:00', '15:30'] },
//     { id: 2, tipoVisita: 'Dermatologia', data: '2025-02-21', orario: [], orariDisponibili: ['10:00', '14:00'] },
//     { id: 3, tipoVisita: 'Ortopedia', data: '2025-02-22', orario: [], orariDisponibili: ['08:30', '13:00', '16:00'] },
//   ];

//   private availabilitySubject = new BehaviorSubject<Disponibilita[]>(this.availabilityList);
  
//   constructor() {}

//   getAvailabilityByTipoVisita(tipoVisita: string): Observable<Disponibilita[]> {
//     const filtered = this.availabilityList.filter(a => a.tipoVisita.toLowerCase() === tipoVisita.toLowerCase());
//     this.availabilitySubject.next(filtered);
//     return this.availabilitySubject.asObservable();
//   }
// }




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

  // Recupera la disponibilità per il tipo di visita e data (in caso ce ne siano più, ne usa il primo)
  getDisponibilita(tipoVisita: string, data: string): Observable<Disponibilita | undefined> {
    return this.http.get<Disponibilita[]>(`${this.apiUrl}/disponibilita?tipoVisita=${tipoVisita}&data=${data}`)
      .pipe(
        map(list => list.length > 0 ? list[0] : undefined)
      );
  }

  // Aggiorna una voce di disponibilità (PUT sul json-server)
  updateDisponibilita(disponibilita: Disponibilita): Observable<Disponibilita> {
    return this.http.put<Disponibilita>(`${this.apiUrl}/disponibilita/${disponibilita.id}`, disponibilita);
  }

  // Rimuove un orario dalla disponibilità
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

  // Ripristina un orario in una voce di disponibilità (se non già presente)
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
