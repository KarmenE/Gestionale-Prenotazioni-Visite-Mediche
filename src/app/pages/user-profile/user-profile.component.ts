
import { Component, OnInit } from '@angular/core';
import { Prenotazione } from '../../models/prenotazione.type';
import { BookingService } from '../../services/booking.service';
import { CommonModule } from '@angular/common';
import { BookingDetailsComponent } from "../booking-details/booking-details.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, BookingDetailsComponent, RouterLink],
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

  closeDetails(deleted: boolean = false): void {
    this.showBookingDetails = false;
    // se è stato eliminato, aggiorno la lista delle prenotazioni
    if (deleted) {
      this.fetchPrenotazioni();
    }
  }


  
  addToGoogleCalendar(prenotazione: Prenotazione) {
    const startDate = new Date(prenotazione.data + 'T' + prenotazione.orario);
    const endDate = new Date(startDate.getTime() + 30 * 60000); // durata 30 minuti
  
    const start = startDate.toISOString().replace(/[-:.]/g, "").slice(0, 15) + "Z";
    const end = endDate.toISOString().replace(/[-:.]/g, "").slice(0, 15) + "Z";
  
    const details = `Visita: ${prenotazione.tipoVisita}\nData: ${prenotazione.data}\nOrario: ${prenotazione.orario}\nInfo: ${prenotazione.note || 'Nessuna nota'}`;
  
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(prenotazione.tipoVisita)}&dates=${start}/${end}&details=${encodeURIComponent(details)}`;
  
    window.open(url, "_blank");
  }
  



}








