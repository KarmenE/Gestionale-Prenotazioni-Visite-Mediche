import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor() { }

  private serviceID = 'service_okm135r';
  private templateID = 'template_aptbw8k';
  private publicKey = 'ua3EHHLKH_DYBdJ9C';


  sendConfirmationEmail(userEmail: string | null, prenotazione: any) {
    if (!userEmail) {
      console.error('Errore: l’indirizzo email è vuoto');
      return Promise.reject('L’indirizzo email è vuoto');
    }
  
    const templateParams = {
      to_email: userEmail,
      tipoVisita: prenotazione.tipoVisita,
      data: prenotazione.data,
      orario: prenotazione.orario
    };
  
    return emailjs.send(this.serviceID, this.templateID, templateParams, this.publicKey)
      .then(response => {
        console.log('Email inviata con successo:', response);
        return response;
      })
      .catch(error => {
        console.error('Errore nell’invio dell’email:', error);
        throw error;
      });
  }

}
