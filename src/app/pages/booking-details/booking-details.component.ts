
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Prenotazione } from '../../models/prenotazione.type';
import { BookingService } from '../../services/booking.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AvailabilityService } from '../../services/availability.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {

  @Input() prenotazione: Prenotazione | undefined;
  @Output() close = new EventEmitter<boolean>();

  constructor(
    private bookingService: BookingService, 
    private route: ActivatedRoute, 
    private router: Router,
    private availabilityService: AvailabilityService
  ) { }

  ngOnInit(): void {
    if (!this.prenotazione) {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      if (id) {
        this.bookingService.getPrenotazioneById(id).subscribe(
          (data: Prenotazione) => {
            this.prenotazione = data;
          },
          error => {
            console.error('Errore nel recupero dei dettagli della prenotazione:', error);
          }
        );
      }
    }
  }

  deletePrenotazione(): void {
    if (this.prenotazione) {
      this.bookingService.deletePrenotazione(this.prenotazione.id).subscribe(
        () => {
          this.availabilityService.restoreOrarioDisponibilita(
            this.prenotazione!.tipoVisita,
            this.prenotazione!.data,
            this.prenotazione!.orario
          ).subscribe(
            () => {
              console.log('Time slot ripristinato con successo');
            },
            error => {
              console.error('Errore nel ripristino del time slot:', error);
            }
          );
          this.close.emit(true);
          this.router.navigate(['/user-profile']);
        },
        error => {
          console.error('Errore nell\'eliminazione della prenotazione:', error);
        }
      );
    }
  }
  

  editPrenotazione(): void {
    if (this.prenotazione) {
      // Passa il bookingId come query param per entrare in modalità modifica
      this.router.navigate(
        ['/availability-calendar', this.prenotazione.tipoVisita],
        { queryParams: { bookingId: this.prenotazione.id } }
      );
    }
  }
}
