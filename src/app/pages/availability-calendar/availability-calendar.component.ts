// //prima di aggiungere eliminazione visita dalla lista disponibilita e aggiornamento lista visite prenotate in caso di modifica visita - tutto funzionante

// import { Component, OnInit } from '@angular/core';
// import { Disponibilita } from '../../models/disponibilita.type';
// import { ActivatedRoute, Router } from '@angular/router';
// import { BookingService } from '../../services/booking.service';
// import { CommonModule } from '@angular/common';
// import { AvailabilityService } from '../../services/availability.service';
// import { Prenotazione } from '../../models/prenotazione.type';
// import { MatSnackBar } from '@angular/material/snack-bar';

// @Component({
//   selector: 'app-availability-calendar',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './availability-calendar.component.html',
//   styleUrl: './availability-calendar.component.css'
// })
// export class AvailabilityCalendarComponent implements OnInit {
//   tipoVisita!: string;
//   disponibilitaList: Disponibilita[] = [];
//   data: string = '';
//   orariDisponibili: string[] = [];
//   prenotazione: Prenotazione | undefined;


//   constructor( private route: ActivatedRoute, private bookingService: BookingService, private AvailabilityService: AvailabilityService, private router: Router, private snackBar: MatSnackBar) { }

//   ngOnInit(): void {
//     this.route.paramMap.subscribe(params => {
//       this.tipoVisita = params.get('tipoVisita') || '';
//       this.fetchDisponibilita();
//     });
//   }

//   fetchDisponibilita(): void {
//     this.bookingService.getDisponibilitaByTipoVisita(this.tipoVisita).subscribe(
//       (data: Disponibilita[]) => {
//         this.disponibilitaList = data;
//       },
//       error => {
//         console.error('Errore nel recupero delle disponibilità:', error);
//       }
//     );
//   }

//   //funzionante - senza modifica/aggiornamento prenotazione in booking details:

//   prenota(disponibilita: Disponibilita, orario: string): void {
//     const utenteId = Number(localStorage.getItem('userId'));  // recupera l'ID utente da localStorage
  
//     if (!utenteId) {  // Se non c'è un utente loggato
//       //alert('Per prenotare una visita devi essere loggato!');
//       return;  // Ferma l'esecuzione
//     }
  
//     const prenotazione = {
//       utenteId: utenteId,  // include l'utenteId recuperato
//       tipoVisita: this.tipoVisita,
//       data: disponibilita.data,
//       orario: orario,
//       note: ''
//     };

//     this.bookingService.createPrenotazione(prenotazione).subscribe(
//       response => {
//         // alert('Prenotazione effettuata!');
//         this.snackBar.open('Prenotazione effettuata!', 'Ok', {
//           verticalPosition: 'top',
//           horizontalPosition: 'center',
//           duration: 3000,
//         });
//         this.router.navigate(['/user-profile']);
//       },
//       error => {
//         console.error('Errore durante la prenotazione:', error);
//       }
//     );
//   }

  

// }


import { Component, OnInit } from '@angular/core';
import { Disponibilita } from '../../models/disponibilita.type';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { AvailabilityService } from '../../services/availability.service';
import { Prenotazione } from '../../models/prenotazione.type';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-availability-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './availability-calendar.component.html',
  styleUrls: ['./availability-calendar.component.css']
})
export class AvailabilityCalendarComponent implements OnInit {
  tipoVisita!: string;
  disponibilitaList: Disponibilita[] = [];
  // Flag per capire se siamo in modalità modifica
  editingBooking: boolean = false;
  bookingToEdit: Prenotazione | null = null;

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private availabilityService: AvailabilityService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.tipoVisita = params.get('tipoVisita') || '';
      // Se esiste un bookingId nei query param, siamo in modalità modifica
      const bookingId = this.route.snapshot.queryParamMap.get('bookingId');
      if (bookingId) {
        this.editingBooking = true;
        this.bookingService.getPrenotazioneById(Number(bookingId)).subscribe(
          data => { this.bookingToEdit = data; },
          error => { console.error('Errore nel recupero della prenotazione da modificare', error); }
        );
      }
      this.fetchDisponibilita();
    });
  }

  fetchDisponibilita(): void {
    this.bookingService.getDisponibilitaByTipoVisita(this.tipoVisita).subscribe(
      (data: Disponibilita[]) => {
        this.disponibilitaList = data;
      },
      error => {
        console.error('Errore nel recupero delle disponibilità:', error);
      }
    );
  }

  prenota(disponibilita: Disponibilita, orario: string): void {
    const utenteId = Number(localStorage.getItem('userId'));
    if (!utenteId) {
      // L'utente non è loggato
      return;
    }

    if (!this.editingBooking) {
      // Creazione nuova prenotazione
      const prenotazione = {
        utenteId: utenteId,
        tipoVisita: this.tipoVisita,
        data: disponibilita.data,
        orario: orario,
        note: ''
      };
      this.bookingService.createPrenotazione(prenotazione).subscribe(
        response => {
          // Rimuovo il time slot prenotato dalla disponibilità
          this.availabilityService.removeOrarioDisponibilita(disponibilita.id, orario).subscribe(
            () => {
              this.snackBar.open('Prenotazione effettuata!', 'Ok', {
                verticalPosition: 'top',
                horizontalPosition: 'center',
                duration: 3000,
              });
              this.router.navigate(['/user-profile']);
            },
            error => console.error('Errore nella rimozione del time slot:', error)
          );
        },
        error => {
          console.error('Errore durante la prenotazione:', error);
        }
      );
    } else {
      // Modifica della prenotazione esistente
      if (this.bookingToEdit) {
        // Creiamo una variabile locale per garantire che non sia undefined
        const booking = this.bookingToEdit;
        // 1. Ripristino il vecchio slot
        this.availabilityService.restoreOrarioDisponibilita(booking.tipoVisita, booking.data, booking.orario)
          .pipe(
            switchMap(() => {
              // 2. Aggiorno la prenotazione con la nuova data/orario
              const updatedBooking: Prenotazione = {
                id: booking.id,            // id non deve essere undefined
                utenteId: booking.utenteId, // utenteId non deve essere undefined
                tipoVisita: booking.tipoVisita, // stessa logica per tipoVisita
                note: booking.note,        // eventuali note (anche se vuote)
                data: disponibilita.data,
                orario: orario
              };
              return this.bookingService.updatePrenotazione(updatedBooking);
            }),
            switchMap(() => {
              // 3. Rimuovo il nuovo time slot dalla disponibilità
              return this.availabilityService.removeOrarioDisponibilita(disponibilita.id, orario);
            })
          )
          .subscribe(
            () => {
              this.snackBar.open('Prenotazione modificata!', 'Ok', {
                verticalPosition: 'top',
                horizontalPosition: 'center',
                duration: 3000,
              });
              this.router.navigate(['/user-profile']);
            },
            error => {
              console.error('Errore nella modifica della prenotazione:', error);
            }
          );
      }
      
    }
  }
}
