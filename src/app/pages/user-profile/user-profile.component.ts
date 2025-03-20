
import { Component, OnInit } from '@angular/core';
import { Prenotazione } from '../../models/prenotazione.type';
import { BookingService } from '../../services/booking.service';
import { CommonModule } from '@angular/common';
import { BookingDetailsComponent } from "../booking-details/booking-details.component";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, BookingDetailsComponent],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  prenotazioni: Prenotazione[] = [];
  utenteId: number = Number(localStorage.getItem('userId')) || 0;
  selectedBooking: Prenotazione | undefined;
  showBookingDetails: boolean = false;

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    console.log('ID utente recuperato:', this.utenteId);
    this.fetchPrenotazioni();
  }
  
  fetchPrenotazioni(): void {
    this.bookingService.getPrenotazioniByUtente(this.utenteId).subscribe(
      (data: Prenotazione[]) => {
        console.log('Prenotazioni ricevute:', data);
        this.prenotazioni = data;
      },
      error => {
        console.error('Errore nel recupero delle prenotazioni:', error);
      }
    );
  }

  showDetails(prenotazione: Prenotazione): void {
    this.bookingService.getPrenotazioneById(prenotazione.id).subscribe(
      (data: Prenotazione) => {
        this.selectedBooking = data;
        this.showBookingDetails = true;
      },
      error => {
        console.error('Errore nel recupero dei dettagli della prenotazione:', error);
      }
    );
  }

  // closeDetails(): void {
  //   this.showBookingDetails = false;
  // }

  closeDetails(deleted: boolean = false): void {
    this.showBookingDetails = false;
    // Se è stato eliminato, aggiorniamo la lista delle prenotazioni
    if (deleted) {
      this.fetchPrenotazioni();
    }
  }
}








